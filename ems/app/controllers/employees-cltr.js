const axios = require('axios');
const Employee = require('../models/employee-model');
const {employeeValidationSchema} = require('../validators/employee-validator')
const employeesCltr = {};


//create a list method
employeesCltr.list  = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'something went wrong'});
    }
};

employeesCltr.show = async (req, res) => {
     const body = req.body;
    try {
        const emp = new Employee(body); 
        await emp.save();
        res.status(201).json(emp);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

employeesCltr.create = async (req, res) => {
    const body = req.body;
    const { error, value} = employeeValidationSchema.validate (body, { abortEarly: false});
    if(error) {
        return res.status(400).json(error);
    }
    try {
        const emp = new Employee(value);
        const geoCodeResponse = await axios.get(`https://geocode.maps.co/search?q=${emp.address}&api_key=${process.env.GEOCODE_API_KEY}`);
        //await emp.save();
        if(geoCodeResponse.data.length>0) {
            emp.geo.lat = geoCodeResponse.data[0].lat;
            emp.geo.lng = geoCodeResponse.data[0].lon;
        }
        await emp.save();
        res.status(201).json(emp);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

employeesCltr.update = async (req, res) => {
    const empId = req.params.empId; 
    const body = req.body; 
    const { error, value} = employeeValidationSchema.validate (body, { abortEarly: false});
    if(error) {
        return res.status(400).json(error);
    }
    try {
        const emp = await Employee.findByIdAndUpdate(empId, value, { new: true }); 
        if(!emp) {
            return res.status(404).json({}); 
        }
        res.json(emp); 
    } catch(err) {
        console.log(err); 
        res.status(500).json({ error: 'Something went wrong!!!'});
    }
}

employeesCltr.remove = async (req, res) => {
     const empId = req.params.empId;
    try {
        const emp = await Employee.findByIdAndDelete(empId);
        if(!emp) {
            return res.status(404).json({});
        }
        res.json(emp);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong!'});
    }
}

module.exports = employeesCltr;