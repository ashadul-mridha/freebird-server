// external import 
const path = require("path");
const fs = require('fs');

//internal import
const HomePage = require('../models/homePage');

const directory = path.parse('E:/Project/FreeBird-project/FreeBirdServer/controllers').dir ;


//get all data
const getAllData = async (req,res) => {
    try {
        const data = await HomePage.find();

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

//get data by id
const getDataByID = async (req,res) => {
    try {
        const data = await HomePage.findOne( {_id: req.params.id} );

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

      if (req.files) {

        //get files
        const bgImgFile = req.files.bgImg;
        const UploadedFilName = bgImgFile.name;

        const fileExt = path.extname(UploadedFilName);
        const fileNameWithoutExt =
          UploadedFilName
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now();

        finalFileName = fileNameWithoutExt + fileExt;

        const uploadPath = `${directory}/public/uploads/homepageimg/${finalFileName}`;

        bgImgFile.mv( uploadPath , (err) => {
          if (err) {
            new Error('File Not Uploaded')
          }
        })

      }

      const homePageData = {...req.body , bgImg : finalFileName }

            const insertHomeData = new HomePage(homePageData);
            const data = await insertHomeData.save();
            
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
            message: "data not added",
            data : null,
            statusCode: 500
            })
        }
        
    }

//update data
const updateDataByID = async (req,res) => {

    try {
        const storedData = await HomePage.findOne( {_id: req.params.id} );
        let finalFileName = storedData.bgImg;
        
        //delete and store new image
        if(req.files){

            //deleted 1st image
            fs.unlink(`${directory}/public/uploads/homepageimg/${storedData.bgImg}`, (err) => {
              if(err){
                    console.log(err.message);
                new Error('Image Not Deleted')
              } else {
                console.log('img deleted');
              }
            })

            //store new image

            //get files
            const bgImgFile = req.files.bgImg;
            const UploadedFilName = bgImgFile.name;

            const fileExt = path.extname(UploadedFilName);
            const fileNameWithoutExt =
            UploadedFilName
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();

            finalFileName = fileNameWithoutExt + fileExt;

            const uploadPath = `${directory}/public/uploads/homepageimg/${finalFileName}`;

            bgImgFile.mv( uploadPath , (err) => {
                if (err) {
                    console.log(err.message);
                    new Error('File Not Uploaded')
                }else {
                    console.log('file uploaded');
                }
            })

        }

         const result = await HomePage.findByIdAndUpdate(
            { _id : req.params.id},
            {
                $set : {
                    title: req.body.title,
                    subTitle : req.body.subTitle,
                    desc: req.body.desc,
                    bgImg: finalFileName
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
            Message : "data not updated",
            data: null,
            statusCode: 500
        })

        console.log(error);

    }


}

const dataDeleteById = async (req,res) => {
    try {
        const data = await HomePage.findOneAndDelete( {_id: req.params.id} );
        
        if(data.bgImg){
            fs.unlink(`${directory}/public/uploads/homepageimg/${data.bgImg}`, (err) => {
              if(err){
                new Error('Image Not Deleted')
              } else {
                
              }
            })
        }
         res.send({
            status: true,
            message: "data deleted successfull",
            data : data,
            statusCode: 200
        })

    } catch (error) {

        res.send({
          status: false,
          message: "data not deleted",
          data : null,
          statusCode: 500
        }) 

    }
}


module.exports = { getAllData , getDataByID, insetSingleUpload, dataDeleteById, updateDataByID }