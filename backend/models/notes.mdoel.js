import { timeStamp } from 'console';
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  isPinned: {
    type: Boolean,
    default: false
  }

}, timeStamp(true))

const Note = mongoose.model('Note', NoteSchema);
export default Note