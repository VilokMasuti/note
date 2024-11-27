import Note from '../models/notes.mdoel.js';

export const getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalNotes = await Note.countDocuments();
    const totalPages = Math.ceil(totalNotes / limit);

    const notes = await Note.find()
      .sort({ isPinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ notes, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error creating note', error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error updating note', error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting note', error: error.message });
  }
};

export const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.isPinned = !note.isPinned;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error toggling pin status', error: error.message });
  }
};
