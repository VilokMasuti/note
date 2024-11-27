/* eslint-disable react/prop-types */
import { Button } from "../components/ui/button"
import { PlusIcon } from 'lucide-react'
import { motion } from 'framer-motion'
const AddNoteButton = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        onClick={onClick}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Add Note
      </Button>
    </motion.div>
  )
}

export default AddNoteButton