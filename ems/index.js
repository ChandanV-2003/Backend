require('dotenv').config(); // npm install dotenv
const express = require('express');
const app = express();   // inbuilt middleware 
const cors = require('cors');  // application + 3rd party middleware
const morgan = require('morgan');   // application + 3rd part middleware
const fs = require('fs');
const path = require('path')
const configureDB = require('./config/db');
const employeesCltr = require('./app/controllers/employees-cltr');
const authenticateUser = require('./app/middlewares/authenticate');
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

configureDB();

//Retrieve all employees
app.get('/api/employees',employeesCltr.list);

//Retrieve single employee
app.get('/api/employees/:empId', employeesCltr.show);

//To creat new employee
app.post('/api/employees', employeesCltr.create);

//To update new employee
app.put('/api/employees/:empId', employeesCltr.update);

// Delete an employee
app.delete('/api/employees/:empId', employeesCltr.remove);

app.listen(port, () => {
    console.log(`EMS server is running on port ${port}`);
});