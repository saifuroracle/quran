const express = require("express");
const app = express()



require("./app/routes/routes.js")(app);


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