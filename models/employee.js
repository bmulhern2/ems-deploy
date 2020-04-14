var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    firstName: String,
    lastName: String
});
var employee = mongoose.model("employee", employeeSchema);
module.exports = employee;