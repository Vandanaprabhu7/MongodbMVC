const express = require("express");
const employeeController = require("./../controllers/employeeController");
const router = express.Router();

router.route("/").get(employeeController.getAllEmployeeDetails);
router
  .route("/signup")
  .get(employeeController.showSignUp)
  .post(employeeController.addNewUser);
router.route("/delete/:id").get(employeeController.removeUser);
router
  .route("/update/:id")
  .get(employeeController.ShowUpdate)
  .post(employeeController.UpdateUser);
module.exports = router;
