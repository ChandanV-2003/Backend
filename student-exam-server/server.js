const express = require('express');
const app = express();
const port = 3050;

app.use(express.json());

const students = [
  { id: 1, name: "Alice Johnson", rollNumber: "R001" },
  { id: 2, name: "Bob Smith", rollNumber: "R002" },
  { id: 3, name: "Charlie Brown", rollNumber: "R003" },
  { id: 4, name: "Diana Prince", rollNumber: "R004" }
];

const results = [
  { rollNumber: "R001", subject: "Math", marks: 85 },
  { rollNumber: "R001", subject: "Science", marks: 90 },
  { rollNumber: "R002", subject: "Math", marks: 70 },
  { rollNumber: "R002", subject: "Science", marks: 75 },
  { rollNumber: "R003", subject: "Math", marks: 60 },
  { rollNumber: "R003", subject: "Science", marks: 65 },
  { rollNumber: "R004", subject: "Math", marks: 95 },
  { rollNumber: "R004", subject: "Science", marks: 92 }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    const student = students.find((ele) => {
        return ele.id === parseInt(id);
    });
     // handle the error first
    if(!student) {    // if the record is not found
        return res.status(404).json({});
    }
    res.json(student);
});

app.get('/results', (req, res) => {
    const rollNumber = req.query.rollNumber;
    const studentResults = results.filter((ele) => {
        return ele.rollNumber == rollNumber;
    });
    if(studentResults.length === 0) {
        return res.status(404).json([]);
    } 
    res.json(studentResults);
});

app.post('/students', (req, res) => {
    const student = req.body;
    student.id = Date.now();
    students.push(student);
    res.status(201).json(student);
})

app.listen(port, () => {
   console.log(`student marks server is running on port ${port}`); 
});