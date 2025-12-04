const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    title: String,
    body: String,
    user: Schema.Types.ObjectId
}, { timestamps: true });

const Note = model('Note', noteSchema);
module.exports = Note;