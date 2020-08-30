require("dotenv").config();
const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const HttpError=require('./models/http-error');
const notesRoute=require('./routes/notes-routes');
const app = express();
const mongoose = require('mongoose');
const userRoute=require('./routes/user-routes');
app.use(
    cors({
      origin: "http://localhost:3000", // restrict calls to those this address
      credentials: true,
    })
  );

  if (process.env.NODE_ENV === "production") {
    console.log("heloooooo");
    app.use(express.static(__dirname + "/myfrontend/build"));  //change folder name from frontend to whatever you have there
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "myfrontend", "build", "index.html")); //change folder name from frontend to whatever you have there
    });
  }
  
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  

app.use('/api/note', notesRoute ); 
app.use('/api/user', userRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route ', 404);
    throw  error;
})
app.use((error, req, res, next)=> {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || "An unknown error occured"});
});


mongoose.connect(process.env.db)
.then(() => { app.listen(8000);})
.catch( err => { console.log(err)});
