import express from "express";
import { createNote, getNotes, deleteNote, togglePinNote, updateNote } from "../controllers/noteControllers.js";

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', togglePinNote);

export default router