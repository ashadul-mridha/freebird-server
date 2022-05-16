const express = require('express');

const router = express.Router();

router.get('/all' , (req, res) => {
    res.status(200).json({
        msg : 'hello'
    })
})

module.exports = router;