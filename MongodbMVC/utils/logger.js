const winston = require("winston");

// logger function
const employeeLogs = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./apilogs/employeeapi.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "./apilogs/employeeapiError.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = employeeLogs;
