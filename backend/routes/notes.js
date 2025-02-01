const express = require("express");
const Note = require("../models/note");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 🔹 ✅ Protect Routes with authMiddleware
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = new Note({ userId: req.user.id, title, content }); // ✅ Store note for logged-in user
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error saving the note", error: error.message });
  }
});

// 🔹 ✅ Get Notes for Logged-in User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // ✅ Fetch only logged-in user's notes
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error: error.message });
  }
});

// 🔹 ✅ Update Note
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // ✅ Ensure only the owner's note is updated
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
});

// 🔹 ✅ Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
  }
});

module.exports = router;
