const empModel = require("./../models/employeeModel");
const logger = require("../utils/logger");
const apiError = require("../utils/apiError"); //this is global exception handler
exports.addNewEmployee = async (req, res) => {
  try {
    const newEmployee = await empModel.create(req.body);
    res.status(201).json({
      status: "Successful",
      message: "Employee added successfully",
      data: {
        employee: newEmployee,
      },
    });
  } catch (err) {
    console.log("Employee failed to save");
    res.status(400).json({
      status: "Fail",
      message: "Employee registration failed",
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await empModel.find();
    res.status(200).json({
      status: "Success",
      results: employees.length,
      data: {
        employeeDetails: employees,
      },
    });
    logger.log("info", "Successful!!!");
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      msg: err.message,
    });
    logger.log("error", "not Successful!!!");
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const employees = await empModel.findOne({ eid: req.params.id });
  if (employees) {
    res.status(200).json({
      status: "Success",
      data: {
        employeeDetails: employees,
      },
    });
  } else {
    //   res.status(404).json({
    //     status: "Failure",
    //     msg: err.message,
    //   });
    // }
    return next(new apiError(500, `id ${req.params.id} doesnt exists`));
  }
};

exports.updateEMployee = async (req, res) => {
  try {
    const emp = await empModel.findOneAndUpdate(
      { eid: req.params.id * 1 },
      req.body,
      {
        new: true,
        runValidators: true,
        includeResultMetadata: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        newEmployeeDetails: emp,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to update",
      message: err.message,
      details: "please check again",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  const response = await empModel.findOneAndDelete({ eid: req.params.id });
  if (response) {
    res.status(200).json({
      status: "Deleted sucessfully",
      data: {
        dataDeleted: response,
      },
    });
  } else {
    res.status(404).json({
      status: "failed to delete",
      details: "Please check employee id",
    });
    logger.log("error", "Cannot delete with invalid id");
  }
};

//for web engine
exports.getAllEmployeeDetails = async (req, res) => {
  const allEmployees = await empModel.find();
  return res.render("employees", {
    allemployeedetails: allEmployees,
  });
};

exports.addNewUser = async (req, res) => {
  try {
    const newEmployee = await empModel.create({
      eid: req.body.empid * 1,
      first_name: req.body.efn,
      last_name: req.body.eln,
      email: req.body.email,
    });
    if (newEmployee != null) {
      return res.render("login");
    }
  } catch (err) {
    return res.render("signup");
  }
};

exports.showSignUp = async (req, res) => {
  return res.render("signup");
};

exports.removeUser = async (req, res, next) => {
  try {
    await empModel.findOneAndDelete({ eid: req.params.id });
    const allEmployees = await empModel.find();
    return res.render("employees", {
      allemployeedetails: allEmployees,
    });
  } catch (err) {
    return next(new apiError(500, `Failed to delete`));
  }
};

exports.ShowUpdate = async (req, res, next) => {
  try {
    const emp = await empModel.findOne({ eid: req.params.id * 1 });
    return res.render("update", {
      empDetails: emp,
    });
  } catch (err) {
    return next(
      new apiError(
        500,
        `${req.params.id} is invalid or not found in the database`
      )
    );
  }
};

exports.UpdateUser = async (req, res, next) => {
  try {
    const emp = await empModel.findOneAndUpdate(
      { eid: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
        includeResultMetadata: true,
      }
    );
    const allEmployees = await empModel.find();
    return res.render("employees", {
      allemployeedetails: allEmployees,
    });
  } catch (err) {
    return next(new apiError(500, `Updation failed`));
  }
};
