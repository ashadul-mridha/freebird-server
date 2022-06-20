//external imports
const express = require('express');

//internal import
const { getAllUser , getUserByID, registrationUser, loginUser, dataDeleteById, updateDataByID } = require('../controllers/userController');
const {checkLogin} = require('../middlewares/common/checkLogin');

//define new router
const router = express.Router();

//get all homepage data
router.get('/all', getAllUser)

//get data by id
router.get('/:id', getUserByID)

//insert and registration a new user

router.post('/registration', registrationUser)

//login a user
router.post('/login', loginUser)

//update single data

//update and get todo
router.put('/:id' , updateDataByID)



//delete data by id
router.delete('/:id', dataDeleteById)

module.exports = router;