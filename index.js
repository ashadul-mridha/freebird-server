//external imports
const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

//internal imports
const { notFoundhandler,  defaultErrorHandler } = require('./middlewares/common/errorHandler');

//router import
const homePageRouter = require('./routers/homePageRouter');
const categoryRouter = require('./routers/categoryRouter');
const albumRouter = require('./routers/albumRouter');


const app = express();

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//solve cors problem
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//database connection
mongoose.connect(process.env.mongoDB_Connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => console.log('database connection succesfull'))
.catch( (err) => console.log(err))

//routing setup
app.use('/api/homepage', homePageRouter);
app.use('/api/category', categoryRouter);
app.use('/api/album', albumRouter);

app.get("/", (req,res) => {
    res.send({message : "Hello Word"})
})

// app.get("/api/category/all", (req,res) => {
//     res.send({message : "Hello Word"})
// })

//not found handler
app.use(notFoundhandler);

//common error handler
app.use(defaultErrorHandler);

const port = process.env.DOMAIN || 5000
app.listen(port, () => {
    console.log('app running on port 5000');
})