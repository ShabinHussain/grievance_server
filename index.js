//import dotenv - to load environment variable
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router= require('./routes')

//import connection string
require('./db/connectiondb')


//create express server
const pfServer = express()

// use  cors- to communicate with the view
pfServer.use(cors())

//use json() method- returns a middleware which can parse json format
pfServer.use(express.json())

//use routes
pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))

//set port for the server
PORT = 4000 || process.env.PORT

//isten to the port - to resolve the request
pfServer.listen(PORT,()=>{
    console.log(`server running successfully at port number :${PORT}`);
    
})
