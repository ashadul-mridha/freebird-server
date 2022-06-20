// external import 
const path = require("path");
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//internal import
const User = require('../models/user');
const directory = path.parse('E:/Project/FreeBird-project/FreeBirdServer/controllers').dir ;

//get all data
const getAllUser = async (req,res) => {
    try {
        // console.log(req.user);
        let { page , size } = req.query;
        
        if(!page){
            page = 1
        }
        if(!size){
            size = 10
        }
        const limit = parseInt(size);
        const skip = ( parseInt(page) - 1) * size;

        const data = await User.find().limit(limit).skip(skip);
        const totalData = await User.countDocuments();

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
const getUserByID = async (req,res) => {
    try {
        const data = await User.findOne( {_id: req.params.id} );

        res.send({
          status: true,
          message: "data get successfull",
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

// inset a single upload data
const registrationUser = async (req, res) => {

    try {

        // password generated hashed
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {...req.body , password: hashedPassword};

        //find user have or not
        const findUser = await User.findOne( { email: req.body.email} )
        console.log(findUser);

        if (findUser) {
            res.send({
                status: false,
                message: "use another email this email used before",
                data: null,
                statusCode: 409
            })
        } else {
            const insertUserData = new User(newUser);
            const data = await insertUserData.save();
            
            res.send({
                status: true,
                message: "data added successfull",
                data : data,
                statusCode: 200
            })
        }

        

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

// login user

async function loginUser(req, res) {
  try {
    // find a user who has this email/username
    const user = await User.findOne( { email: req.body.email} )

    if (user && user._id) {

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          userid: user._id,
          name: user.name,
          email: user.email,
          userRole: user.userRole
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        const data ={ ...userObject , jwtToken: token }

        res.send({
            status: true,
            message: "data fetch successfull",
            data : data,
            statusCode: 200
        })

      } else {
        res.send({
            status: false,
            message: "Login failed! Please try again.",
            data : null,
            statusCode: 500
        })
      }
    } else {
      res.send({
          status: false,
          message: "Login failed! Please try again.",
          data : null,
          statusCode: 500
      })
    }
  } catch (err) {
    
    console.log(error.message); 

    res.send({
        status: false,
        message: error.message,
        data : null,
        statusCode: 500
    })
  }
}

// update data
const updateDataByID = async (req,res) => {

    try {
        const storedData = await Client.findOne( {_id: req.params.id} );
        let finalFileName = storedData.image;
        console.log(storedData);
        
        //delete and store new image
        if(req.files){

            //deleted 1st image
            fs.unlink(`${directory}/public/uploads/clientimg/${storedData.image}`, (err) => {
              if(err){
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

            const uploadPath = `${directory}/public/uploads/clientimg/${finalFileName}`;

            imageFile.mv( uploadPath , (err) => {
                if (err) {
                    console.log(err.message);
                    new Error('File Not Uploaded')
                }else {
                    console.log('file uploaded');
                }
            })

        }

         const result = await Client.findByIdAndUpdate(
            { _id : req.params.id},
            {
                $set : {
                    name: req.body.name,
                    live_link: req.body.live_link,
                    image: finalFileName,
                    userRole: req.body.userRole,
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

const dataDeleteById = async (req,res) => {
    try {
        const data = await User.findOneAndDelete( {_id: req.params.id} );
        
        if(data){
            fs.unlink(`${directory}/public/uploads/clientimg/${data.image}`, (err) => {
              if(err){
                new Error('Image Not Deleted')
              } else {
                
              }
            })
        }
        
        if (data === null) {
            res.status(200).json({
                status: true,
                Message : error.message,
                data: data,
                statusCode: 200
            })
            
        }else{
            res.status(200).json({
                status: true,
                Message : "data Updated Successfull",
                data: data,
                statusCode: 200
            })
        }

    } catch (error) {

        res.send({
          status: false,
          message: error.message,
          data : null,
          statusCode: 500
        }) 

    }
}


module.exports = { getAllUser , getUserByID, registrationUser, loginUser, dataDeleteById, updateDataByID }