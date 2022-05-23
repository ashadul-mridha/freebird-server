// external import 
const path = require("path");
const fs = require('fs');
const uniqueSlug = require('unique-slug');

//internal import
const Image = require('../models/image');
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

        const data = await Image.find().populate('cat_id').populate('album_id').limit(limit).skip(skip);
        const totalData = await Image.countDocuments();

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
        const data = await Image.findOne( {_id: req.params.id} ).populate('cat_id').populate('album_id');

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

//get album image by id
const getAlbumImgByID = async (req,res) => {
    try {
        const data = await Image.find( {album_id: req.params.id} ).populate('cat_id').populate('album_id');

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


//get category image by id
const getCategoryImgByID = async (req,res) => {
    try {
        const data = await Image.find( {cat_id: req.params.id} ).populate('cat_id').populate('album_id');

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
        console.log(finalFileName);

        const uploadPath = `${directory}/public/uploads/singleimg/${finalFileName}`;

        imageFile.mv( uploadPath , (err) => {
          if (err) {
              console.log(err.message);
            new Error('File Not Uploaded')
          }
        })

    }

        const slug = uniqueSlug(req.body.caption);

        const albumData = {...req.body , image : finalFileName , slug }

        const insertImageData = new Image(albumData);
        const data = await insertImageData.save();
        
        res.send({
            status: true,
            message: "data added successfull",
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

//update data
const updateDataByID = async (req,res) => {

    try {
        const storedData = await Image.findOne( {_id: req.params.id} );
        let finalFileName = storedData.image;
        
        //delete and store new image
        if(req.files){

            //deleted 1st image
            fs.unlink(`${directory}/public/uploads/singleimg/${storedData.image}`, (err) => {
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

            const uploadPath = `${directory}/public/uploads/singleimg/${finalFileName}`;

            imageFile.mv( uploadPath , (err) => {
                if (err) {
                    console.log(err.message);
                    new Error('File Not Uploaded')
                }else {
                    console.log('file uploaded');
                }
            })

        }

         const result = await Image.findByIdAndUpdate(
            { _id : req.params.id},
            {
                $set : {
                    cat_id: req.body.cat_id,
                    album_id: req.body.album_id,
                    caption: req.body.caption,
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
            Message : error.message,
            data: null,
            statusCode: 500
        })


    }


}

//delete single data
const dataDeleteById = async (req,res) => {
    try {
        const data = await Image.findOneAndDelete( {_id: req.params.id} );
        
        if(data.image){
            fs.unlink(`${directory}/public/uploads/singleimg/${data.image}`, (err) => {
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
          message: error.message,
          data : null,
          statusCode: 500
        }) 

    }
}


module.exports = { getAllData , getDataByID, getAlbumImgByID, getCategoryImgByID, insetSingleUpload, dataDeleteById, updateDataByID }