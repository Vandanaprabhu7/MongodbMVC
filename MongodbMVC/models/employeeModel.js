const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
  eid: {
    type: Number,
    required: [true, "Employee id is needed and it should be unique"],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "Employee first name is needed and it should be unique"],
    default: "Default_Vandu",
  },
  last_name: {
    type: String,
    required: [true, "Employee last name is needed and it should be unique"],
    default: "Default_Prabhu",
  },
  email: {
    type: String,
    required: [true, "Employee email is needed and it should be unique"],
    unique: true,
  },
  car_model: {
    type: String,
    required: [false, "car model is ooptional and it should be unique"],
  },
});

const EmpModel = mongoose.model("EmpModel", empSchema);

module.exports = EmpModel;
