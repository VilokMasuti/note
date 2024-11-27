/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'

const Toast = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <motion.div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      {message}
    </motion.div>
  )
}

export default Toast

