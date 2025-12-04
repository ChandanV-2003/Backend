const Task = require('../module/task-module.js');
const taskcltr = {};

taskcltr.list = async (req, res) => {
 try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'something went wrong'});
    }
};

taskcltr.show = async (req, res) => {
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
};

taskcltr.add = async (req, res) => {
    const body = req.body;
    try {
        const task = new Task(body);
        await task.save();
        res.status(201).json(task)
    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'something went wrong!!'});
    }
};

taskcltr.update = async (req, res) => {
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
}

taskcltr.remove = async (req, res) => {
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
};

module.exports = taskcltr;