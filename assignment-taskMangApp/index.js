const express = require('express');
const app = express();
const cors = require('cors');
const configureDB = require('./config/db');
const taskcltr = require('./app/controllers/task-cltr')
const port = 5050;

app.use(express.json());
app.use(cors())
/*
 //application level middleware if not installed cors
 app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-Origin', '*');
    next(0)
    })
*/

configureDB();

app.get('/tasks', taskcltr.list);

app.get('/tasks/:id', taskcltr.show);

app.post('/tasks', taskcltr.add);

app.put('/tasks/:id', taskcltr.update);

app.delete('/tasks/:id', taskcltr.remove)

app.listen(port, () => {
    console.log(`task aggignment server is running in port ${port}`)
});