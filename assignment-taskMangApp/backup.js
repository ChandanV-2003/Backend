const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5050;

app.use(express.json());

async function configureDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task-assig')
        console.log('connected to db');
    } catch(err) {
        console.log('error connecting to db', err)
    }
}
configureDB();

//creation of schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
}, {timestamps: true});

//model creation 
const Task = mongoose.model('Task', taskSchema)

//API endpoints

//Retrive all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'something went wrong'});
    }
});

//get data by taskid 
app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({})
        }
        res.json(task);
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'something went wrong!!'});
    }
});

//add new task
app.post('/tasks', async (req, res) => {
    const body = req.body;
    try {
        const task = new Task(body);
        await task.save();
        res.status(201).json(task)
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'something went wrong!!'});
    }
});

//update task by id
app.put('/tasks/:id', async (req, res) => {
        const taskId = req.params.id;
        const body = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, body, { new: true });
        if(!task) {
            return res.status(404).json({});
        }
        res.json(task);
    } catch(err) {
        console.log(err);
        res.status(400).json({error: 'something went wrong!!'});
    }
})

//delete task by id
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if(!task) {
            return res.status(404).json({});
        }
        res.json(task);
    } catch(err) {
        console.log(err);
        res.status(400).json({error: 'something went wrong!!'});
    }
})

app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});