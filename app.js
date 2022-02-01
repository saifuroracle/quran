const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var multer = require('multer');
var forms = multer();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {engine} = require('express-handlebars');
const app = express()

require('dotenv').config();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');


// =========cors==========
app.use(cors());
// =========cors==========

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type: application/json
// app.use(bodyParser.json());
app.use(express.json());

// for parsing multipart/form-data
app.use(forms.array()); 

// =================route==================
require("./routes/routes.js")(app);
app.get('/', (req, res) => {
  res.json({message: 'Welcome'})
}) 


const main = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION, () => {
      console.log(`Successfully connected to MongoDB.`);
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

}

main().catch(err => {

})

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(3000, () => {
  console.log(`App is running on port ${PORT}.`);
});