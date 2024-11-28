/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import NoteCard from './NoteCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const NoteGrid = ({ notes, onNoteClick, onPinNote }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onClick={() => onNoteClick(note)}
          onPin={() => onPinNote(note._id)}
        />
      ))}
    </motion.div>
  )
}

export default NoteGrid

