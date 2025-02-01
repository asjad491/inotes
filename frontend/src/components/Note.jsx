import React, { useState } from 'react';
import { FaThumbtack, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from './Modal'; // Import the Modal component

const Note = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState(''); // Store the content of the note
  const [noteTitle, setNoteTitle] = useState('Note Title'); // Store the title of the note

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString(); // Date (MM/DD/YYYY)
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Time (HH:MM)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNote = (title, content) => {
    console.log('Saved Note:', { title, content });
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div>
      {/* Note */}
      <div
        onClick={handleOpenModal}
        className="max-w-sm w-full bg-white rounded-lg shadow-md my-4 p-6 space-y-4 relative transition-all duration-300 ease-in-out hover:shadow-xl ring-2 ring-blue-500/50 cursor-pointer"
      >
        {/* Pin, Edit, and Delete Buttons */}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button
            className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 focus:outline-none transition-colors"
            title="Pin Note"
          >
            <FaThumbtack className="text-lg" />
          </button>
          <button
            className="text-green-500 hover:text-green-600 p-2 rounded-full hover:bg-green-100 focus:outline-none transition-colors"
            title="Edit Note"
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 focus:outline-none transition-colors"
            title="Delete Note"
          >
            <FaTrashAlt className="text-lg" />
          </button>
        </div>

        {/* Title with Underline */}
        <h2 className="text-xl font-semibold text-blue-800 border-b-2 border-gray-300 pb-2">
          {noteTitle}
        </h2>

        {/* Content */}
        <p className="text-gray-700 text-base">
          {noteContent || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>

        {/* Date and Time Section */}
        <div className="text-xs text-gray-500 flex justify-between">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        onSaveNote={handleSaveNote}
      />
    </div>
  );
};

export default Note;
