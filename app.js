const express = require("express");
const mongoose = require("mongoose");
const app = express()
require('dotenv').config();


require("./routes/routes.js")(app);



const main = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION, () => {
      console.log(`Connected to database`);
  })
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