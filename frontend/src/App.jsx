import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNotes, createNote, updateNote, deleteNote, togglePinNote } from './services/api'
import Header from './shared/Header'
import NoteGrid from './shared/NoteGrid'
import NoteModal from './shared/NoteModel'
import Toast from './shared/Toast'

const App = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      console.log('API Response:', response.data); // Check the structure
      setNotes(response.data.notes || []); // Safeguard for undefined `notes`
    } catch (error) {
      console.error('Error fetching notes:', error);
      showToast('Failed to fetch notes. Please try again.', 'error');
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedNote(null)
    setIsModalOpen(false)
  }

  const handleSaveNote = async (updatedNote) => {
    try {
      if (updatedNote._id) {
        await updateNote(updatedNote._id, updatedNote)
        showToast('Note updated successfully', 'success')
      } else {
        await createNote(updatedNote)
        showToast('Note created successfully', 'success')
      }
      fetchNotes()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving note:', error)
      showToast('Failed to save note. Please try again.', 'error')
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId)
      fetchNotes()
      handleCloseModal()
      showToast('Note deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting note:', error)
      showToast('Failed to delete note. Please try again.', 'error')
    }
  }

  const handlePinNote = async (noteId) => {
    try {
      await togglePinNote(noteId)
      fetchNotes()
      showToast('Note pin status updated', 'success')
    } catch (error) {
      console.error('Error pinning/unpinning note:', error)
      showToast('Failed to update note pin status. Please try again.', 'error')
    }
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddNote={() => setIsModalOpen(true)} />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoteGrid
            notes={notes}
            onNoteClick={handleNoteClick}
            onPinNote={handlePinNote}
          />
        </motion.div>
      </main>
      <AnimatePresence>
        {isModalOpen && (
          <NoteModal
            note={selectedNote}
            onClose={handleCloseModal}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  )
}

export default App

