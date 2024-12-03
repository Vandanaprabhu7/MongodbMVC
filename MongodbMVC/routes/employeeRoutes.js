const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.addNewEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployeeById)
  .patch(employeeController.updateEMployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
