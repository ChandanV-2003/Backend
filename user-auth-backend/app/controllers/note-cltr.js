const Note = require('../models/note-model');

const noteCltr = {};


// List all notes
noteCltr.list = async (req, res) => {
    try {
        let notes;
        if (req.role == 'admin'){
            notes = await Note.find();
        } else {
         notes = await Note.find({user: req.userId}); // latest first
        }
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

noteCltr.show = async(req, res) => {
    const id = req.params.id;
    try{
        const note = await Note.findOne( { _id: id, user: req.userId });
        if(!note){
            return res.status(404).json({});
        }
        res.json(note);

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

//Create a note
noteCltr.create = async (req, res) => {
    const body = req.body;
    try {
        const note = new Note(body);
        note.user = req.userId;
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

//Update a note by ID
noteCltr.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const note = await Note.findOneAndUpdate({ _id: id, user: req.userId}, body, {new:true});
        if (!note) {
            return res.status(404).json({});
        }
        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


//Delete a note by ID
noteCltr.remove = async (req, res) => {
    const id = req.params.id;
    // const body = req.body;
    try {
        const note = await Note.findOneAndDelete({ _id: id, user: req.userId});
        if (!note) {
            return res.status(404).json({error: 'Note not found'});
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = noteCltr;