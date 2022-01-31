const express = require("express");
const mongoose = require("mongoose");
const app = express()
require('dotenv').config();


require("./routes/routes.js")(app);


mongoose.connect(process.env.MONGODB_CONNECTION, () => {
    console.log(`Connected to database`);
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


// set port, listen for requests
const PORT = process.env.APP_PORT || 3000;
app.listen(3000, () => {
  console.log(`App is running on port ${PORT}.`);
});