/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { PlusIcon } from 'lucide-react'
import { Button } from '../components/ui/button'
const Header = ({ onAddNote }) => {
  return (
    <motion.header
      className="bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-medium text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Notes
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onAddNote} className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Note
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header


