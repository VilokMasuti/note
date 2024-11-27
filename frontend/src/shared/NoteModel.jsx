/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
}

const NoteModal = ({ note, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setTagline(note.tagline)
      setBody(note.body)
    } else {
      setTitle('')
      setTagline('')
      setBody('')
    }
  }, [note])

  const handleSave = () => {
    onSave({
      _id: note?._id,
      title,
      tagline,
      body,
      isPinned: note?.isPinned || false,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="p-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-semibold mb-2 p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full text-sm mb-4 p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Note content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="6"
            className="w-full text-sm p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <div className="flex justify-end p-4 bg-gray-50 rounded-b-lg">
          {note && (
            <button
              onClick={() => onDelete(note._id)}
              className="text-red-500 hover:text-red-700 font-medium mr-4"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-medium mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NoteModal

