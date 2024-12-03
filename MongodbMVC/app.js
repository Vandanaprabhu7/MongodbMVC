const express = require("express");
const empRouter = require("./routes/employeeRoutes");
const app = express();
const path = require("path");
const errorHandler = require("./controllers/errorController");
const apiError = require("./utils/apiError");
//setting a view engine
const webEmployeeRouter = require("./routes/empRoutes");
app.set("view engine", "ejs"); //template engine and type
app.set("views", path.resolve("./views")); //if folder name is not views

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //request coming from form type of data
app.use("/api/v1/employees", empRouter);
app.use("/web/employees", webEmployeeRouter);

//applying to all http requests, if wrong url is entered
app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "Failed",
  //     message: `${req.originalUrl} is not found, please check again`,
  //   });
  //   const error = new Error(
  //     `${req.originalUrl} is not found, please check again`
  //   );
  //   error.statusCode = 404;
  //   error.status = "Bad request";
  // next(error);
  next(
    new apiError(404, `${req.originalUrl} is not found, please check again`)
  );
});

//error handling
app.use(errorHandler.errorMiddleware);

module.exports = app;
