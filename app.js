//Code will be be inside iife function with exports, module etc as args

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000; // set env with "export PORT=5000 " or in nodemon.json for nodemon 
// const ENV = process.env.NODE_ENV || 'development';
// const Joi = require('joi') //joi is for data validation. by convention classes have first letter capital
const morgan = require("morgan")  //logging module
const path = require('path')
const mongoDB = require('./config/mongoose-db')
const multer = require('multer')
let upload = multer();

require('./config/passport');

//set view engine
app.set('view engine', "ejs")

//set view 
app.set('view', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(upload.fields([]))
app.use(require('cors')({ origin: [], credentials: true }))
// app.use((req,res,next)=>{ // CORS ERROR HANDLING
//     req.header('Access-Control-Allow-Origin','*') // * for all or for specific origin eg http://my.example.com
//     req.header('Access-Control-Allow-Headers','*') // * for all or for specific headers eg 'Origin, X-requested-with, etc..'
//     if (req.method === 'OPTIONS'){
//         req.header('Access-Control-Allow-Methoda','PUT, GET, PATCH, DELETE')
//         return res.status(200).json({})
//     }
// })
//connect to mongodb
mongoDB.connect()
  .then((connection) => {

    console.log('MongoDB Connected successfully')
    //passport
    var passport = require('passport');
    var session = require('express-session');
    const MongoStore = require('connect-mongo')(session);
    app.use(passport.initialize());

    //middlewares
    app.use(morgan('dev')) //log route requests
    app.use(express.json())  // middleware to enable pasing if json obj in body of req.it is based on body-parser..for form data parsing use multer https://www.youtube.com/watch?v=srPXMt1Q0nY&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=10
    app.use('/public', express.static(path.join(__dirname, 'assets'))) //serves static files and is based on serve-static.

    //root url
    app.use("/", require("./api/routes"))
    app.use("/users", require("./api/routes/users"))
    app.use("/auth", require("./api/routes/auth"))

    // handle errors
    // app.use((error,req,res,next)=>{
    //     res.status(error.status||500)
    //     .send('hello world')
    //     res.json({
    //         error:{
    //             message:error.message
    //         }
    //     })
    // })
    //start server
    app.listen(PORT, () => console.log(`listning on port ${PORT}...`))
  }).catch((err) => console.log('Failed to connect to mongo DB ', err))






