/* eslint-disable react/prop-types */
import { Button } from "../components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { motion } from 'framer-motion'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <motion.div
      className="flex justify-center items-center space-x-2 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600 hover:bg-gray-100"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <span className="text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:bg-gray-100"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

export default Pagination

