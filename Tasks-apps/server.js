const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');

// es6 object destructuring - helps you to extract properties from an object and makes it available as independent variable
// const obj = { a:1, b:2, c:3 }
// const { c } =obj; // here we are extracting property c from the obj
// console.log(c); here is available as a independent variable 

const app = express();
const port = 3075;


app.use(express.json());

// establising connection to the database
const client = new MongoClient('mongodb://127.0.0.1:27017');
let db;
async function configuredDB() {
    try {
        await client.connect();  // connect to mongodb software
        db = client.db('task-app-july25');  // creat a project database
        console.log('connected to db')
    } catch(err) {
        console.log('error connecting to db', err.message);
    }
}
configuredDB();

//How to connect a record in DB
app.post('/tasks', async(req, res) => {
    const body = req.body;  // const {body} = req;(object destructuring)
    try {
        const task = await db.collection('tasks').insertOne(body);
        console.log(task);
        res.status(201).json({
            _id: task.insertedId,
            ...body
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'something went wrong!'});
    }
});

// list all the tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.collection('tasks').find().toArray();
        res.json(tasks);
    } catch {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong!'})
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = req.query.tasks
        if(tasks.status === 0) {
        return res.status(404).json([]);
    } 
    res.json(pending);
    } catch {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong!'})
    }
})

// find one task
app.get('/tasks/:id', async (req, res) => {
    //const id = req.params.id;
    const {id} = req.params;
    try {
        const task = await db.collection('tasks').findOne({_id: new ObjectId(id)});
        res.json(task);
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const task = await db.collection('tasks').deleteOne({_id: new ObjectId(id)});
        if(!task) {
            return res.status(404).json({});
        }
        res.json(task);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong'});
    }
});

app.get("/tasks", async (req, res) => {
    const {status} = req.query; 
    try {
        const tasks = await db.collection('tasks').find(query).toArray();
        
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Something went wrong!!!'});
    }
});

app.listen(port, () => {
    console.log(`tasks-app server is running in port ${port}`);
});