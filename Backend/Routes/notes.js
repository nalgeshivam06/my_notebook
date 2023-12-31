const express = require('express');
const router = express.Router();
var fetchuser = require('./middleware/fetchuser');
const Note = require('../Models/Note');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all the notes using : Get "/api/note/createuser". Doesn't required  auth

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})

// Route 2 : Get all the notes using : Post "/api/note/addnote". Doesn't required  auth

router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),], async (req, res) => {

        try {
            const { title, description, tag, } = req.body;

            // if there are error return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id

            })
            const saveNote = await note.save()

            res.json(saveNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })


// Route 3 : Update an existing note using : Put "/api/notes/addnote". Doesn't required  auth

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, } = req.body;
    try {

        // Create a newnote object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note and updated and update it

        let note = await Note.findById(req.params.id);
        if (!note) ({ return: res.status(404).send("Not Found") })

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }

})

// Route 4 : Delete an existing note using : DELETE "/api/notes/deletenote". Doesn't required  auth

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note and delete and delete it

        let note = await Note.findById(req.params.id);
        if (!note) ({ return: res.status(404).send("Not Found") })

        // Allow deletion only if user owns this Note

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router; 