const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4040;

app.use(express.json());

async function configureDB() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ems-july25');
        console.log('connected to db');
    } catch(err) {
        console.log('error connecting to db', err)
    }
}
configureDB();

// create a schema 
// { _id: '', firstName: '', lastName: '', username: '', email: '', mobile: '', createdAt: '', updatedAt: ''}
// timestamp - createdAt, updatedAt
const employeeSchema = new mongoose.Schema({ // structure of the document
    firstName: String, 
    lastName: String,
    username: String, 
    email: String, 
    mobile: String 
}, { timestamps: true })

// create a model 
const Employee = mongoose.model('Employee', employeeSchema); 
 
// CRUD operations 

// retrive all employee
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'something went wrong'});
    }
});

//creat a new employee
app.post('/api/employees', async (req, res) => {
    const body = req.body;
    try {
        const emp = new Employee(body); 
        await emp.save();
        res.status(201).json(emp);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// retrive single employee by id
app.get('/api/employees/:empId', async (req, res) => {
    const empId = req.params.empId;
    try {
        const employee = await Employee.findById(empId);  // db.collection('employees').findOne({_id: new Object(empId)})
        if(!employee){
            return req.status(404).json({})
        }
        res.json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong!!'});
    }       
});

//update data
app.put('/api/employees/:empId', async (req, res) => {
    const empId = req.params.empId; 
    const body = req.body; 
    try {
        const emp = await Employee.findByIdAndUpdate(empId, body, { new: true }); 
        if(!emp) {
            return res.status(404).json({}); 
        }
        res.json(emp); 
    } catch(err) {
        console.log(err); 
        res.status(500).json({ error: 'Something went wrong!!!'});
    }
}); 

//delete data
app.delete('/api/employees/:empId', async(req, res) => {
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
});

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
});