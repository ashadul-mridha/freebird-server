//external imports
const express = require('express');

//internal import
const { getAllData, getDataByID, getAlbumImgByID, getCategoryImgByID, insetSingleUpload, dataDeleteById, updateDataByID } = require('../controllers/imageController');

//define new router
const router = express.Router();

//get all homepage data
router.get('/all', getAllData)

//get data by id
router.get('/:id', getDataByID)

//get albumImg by id
router.get('/album/:id', getAlbumImgByID)

//get albumImg by id
router.get('/category/:id', getCategoryImgByID)

//insert home page data

router.post('/add', insetSingleUpload)

//update single data

//update and get todo
router.put('/:id' , updateDataByID)



//delete data by id
router.delete('/:id', dataDeleteById)

module.exports = router;