//external imports
const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
//internal imports
const homePageRouter = require('./routers/homePageRouter');
const { notFoundhandler,  defaultErrorHandler } = require('./middlewares/common/errorHandler');


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
app.use('/homepage', homePageRouter);

app.get("/", (req,res) => {
    res.send({message : "Hello Word"})
})

//not found handler
app.use(notFoundhandler);

//common error handler
app.use(defaultErrorHandler);


app.listen(5000, () => {
    console.log('app running on port 5000');
})