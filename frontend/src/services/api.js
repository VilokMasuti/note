import axios from 'axios';

const API_URL = 'https://note-7pl0.onrender.com/api'; // Ensure the URL points to your deployed backend

const api = axios.create({
  baseURL: API_URL,
});

export const getNotes = (page = 1) => api.get(`/notes?pages=${page}`);
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const togglePinNote = (id) => api.patch(`/notes/${id}/pin`);
