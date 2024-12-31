import express from "express" ;

import http from "http"

import myapp from './app.js'

const app = express()



const server  = http.createServer(myapp)

import dotenv from 'dotenv';
import connectDB from "./dbConnect/db.js";

dotenv.config();



connectDB()
// Use the PORT variable from .env file or default to 3000 if not set
const {PORT} =process.env

  

//create a server for the applications

server.listen(PORT, ()=>{
    console.log(`server is listening on http//localhost:${PORT}`)
})

