const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    mobile: String,
    address: String,
    geo: {
        lat: Number,
        lng: Number
    }
}, { timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;