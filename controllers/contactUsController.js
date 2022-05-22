// external import 
const path = require("path");
const fs = require('fs');

//internal import
const ContactUs = require('../models/contactUs');

const directory = path.parse('E:/Project/FreeBird-project/FreeBirdServer/controllers').dir ;


//get all data
const getAllData = async (req,res) => {
    try {

        let { page , size } = req.query;
        
        if(!page){
            page = 1
        }
        if(!size){
            size = 10
        }
        const limit = parseInt(size);
        const skip = ( parseInt(page) - 1) * size;

        const data = await ContactUs.find().limit(limit).skip(skip);
        const totalData = await ContactUs.countDocuments();

        res.send({
          status: true,
          message: "data get successfull",
          data : data,
          totalData,
          statusCode: 200
        })

    } catch (error) {
        
        res.send({
          status: false,
          message: "failed to fatch data",
          data : null,
          statusCode: 500
        })        

    }
}

//get data by id
const getDataByID = async (req,res) => {
    try {
        const data = await ContactUs.findOne( {_id: req.params.id} );

        res.send({
          status: true,
          message: "data get successfull",
          data : data,
          statusCode: 200
        })

    } catch (error) {
        
        res.send({
          status: false,
          message: "failed to fatch data",
          data : null,
          statusCode: 500
        })  

    }
}

//inset a single upload data
const insetSingleUpload = async (req, res) => {

    try {

            const insertContactUsData = new ContactUs(req.body);
            const data = await insertContactUsData.save();
            
            res.send({
            status: true,
            message: "data added successfull",
            data : data,
            statusCode: 200
            })

        } catch (error) {
            
            console.log(error.message); 

            res.send({
            status: false,
            message: error.message,
            data : null,
            statusCode: 500
            })
        }
        
    }

//update data
const updateDataByID = async (req,res) => {

    try {

         const result = await ContactUs.findByIdAndUpdate(
            { _id : req.params.id},
            {
                $set : {
                    name: req.body.name,
                    email : req.body.email,
                    subject: req.body.subject,
                    message: req.body.message
                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        )
        
        res.status(200).json({
            status: true,
            Message : "data Updated Successfull",
            data: result,
            statusCode: 200
        })
        
    } catch (error) {
        
        res.status(500).json({
            status: false,
            Message : error.message,
            data: null,
            statusCode: 500
        })

        console.log(error);

    }


}

const dataDeleteById = async (req,res) => {
    try {
        const data = await ContactUs.findOneAndDelete( {_id: req.params.id} );
        
         res.send({
            status: true,
            message: "data deleted successfull",
            data : data,
            statusCode: 200
        })

    } catch (error) {

        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 

    }
}


module.exports = { getAllData , getDataByID, insetSingleUpload, dataDeleteById, updateDataByID }