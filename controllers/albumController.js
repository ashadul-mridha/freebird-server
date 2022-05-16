// external import 
const path = require("path");
const fs = require('fs');
const uniqueSlug = require('unique-slug');

//internal import
const Album = require('../models/album');
const directory = path.parse('E:/Project/FreeBird-project/FreeBirdServer/controllers').dir ;

//get all data
const getAllData = async (req,res) => {
    try {
        const data = await Album.find();

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
        const data = await Album.findOne( {_id: req.params.id} );

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
    
    let finalFileName;

    if (req.files) {

        //get files
        const imageFile = req.files.image;
        const UploadedFilName = imageFile.name;

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

        const uploadPath = `${directory}/public/uploads/albumimg/${finalFileName}`;

        imageFile.mv( uploadPath , (err) => {
          if (err) {
              console.log(err.message);
            new Error('File Not Uploaded')
          }
        })

    }

        const slug = uniqueSlug(req.body.name);

        const albumData = {...req.body , image : finalFileName , slug }
        console.log(albumData);

        const insertAlbumData = new Album(albumData);
        const data = await insertAlbumData.save();
        
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
        const storedData = await Album.findOne( {_id: req.params.id} );
        let finalFileName = storedData.image;
        
        //delete and store new image
        if(req.files){

            //deleted 1st image
            fs.unlink(`${directory}/public/uploads/albumimg/${storedData.image}`, (err) => {
              if(err){
                    console.log(err.message);
                new Error('Image Not Deleted')
              } else {
                console.log('img deleted');
              }
            })

            //store new image

            //get files
            const imageFile = req.files.image;
            const UploadedFilName = imageFile.name;

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

            const uploadPath = `${directory}/public/uploads/albumimg/${finalFileName}`;

            imageFile.mv( uploadPath , (err) => {
                if (err) {
                    console.log(err.message);
                    new Error('File Not Uploaded')
                }else {
                    console.log('file uploaded');
                }
            })

        }

         const result = await Album.findByIdAndUpdate(
            { _id : req.params.id},
            {
                $set : {
                    name: req.body.name,
                    cat_id: req.body.cat_id,
                    title: req.body.title,
                    subTitle : req.body.subTitle,
                    desc: req.body.desc,
                    image: finalFileName,
                    isActive: req.body.isActive
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


    }


}

const dataDeleteById = async (req,res) => {
    try {
        const data = await Album.findOneAndDelete( {_id: req.params.id} );
        
        if(data.image){
            fs.unlink(`${directory}/public/uploads/albumimg/${data.image}`, (err) => {
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