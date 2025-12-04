const mongoose = require('mongoose');

const configureDB = async function () {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/task-assig')
        console.log('connected to db');
    } catch(err) {
        console.log('error connecting to db', err)
    }
}

module.exports = configureDB