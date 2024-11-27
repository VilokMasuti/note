/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

const NoteCard = ({ note, onClick, onPin }) => {
  const cardColors = [
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-pink-100',
    'bg-purple-100',
  ]
  const colorClass = cardColors[note._id.charCodeAt(0) % cardColors.length]

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      className={`${colorClass} rounded-lg shadow p-4 cursor-pointer relative`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800 mb-2">{note.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{note.tagline}</p>
      <p className="text-gray-700 text-sm line-clamp-3">{note.body}</p>
      <button
        className={`absolute top-2 right-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200 ${note.isPinned ? 'text-yellow-500' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onPin()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H5V5zM8 8h4v8H8V8zM5 8h2v8H5V8zm7 8h2V8h-2v8z" />
        </svg>
      </button>
    </motion.div>
  )
}

export default NoteCard

