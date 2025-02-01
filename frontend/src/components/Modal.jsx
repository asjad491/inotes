import React, { useState } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const Modal = ({ isOpen, onClose, noteTitle, setNoteTitle, noteContent, setNoteContent, onSaveNote }) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const handleSaveNote = () => {
    onSaveNote(noteTitle, noteContent);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }} // Initial state: invisible
      animate={{ opacity: 1 }} // Final state: fully visible
      exit={{ opacity: 0 }} // When the modal closes, it fades out
      transition={{ duration: 0.3 }} // Duration of the fade-in/out animation
    >
      <motion.div
        className="bg-white rounded-lg p-5 w-full max-w-lg m-3 shadow-lg relative"
        initial={{ scale: 0.9 }} // Initial scale: slightly smaller
        animate={{ scale: 1 }} // Final scale: normal size
        exit={{ scale: 0.9 }} // When the modal closes, it shrinks slightly
        transition={{ duration: 0.2 }} // Duration of the scale animation
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          title="Close Modal"
        >
          <FaTimes className="text-xl" />
        </button>

        <h3 className="text-xl font-semibold text-blue-800 mb-4">Edit Note</h3>

        {/* Title Input */}
        <input
          className={`w-full p-4 border-2 rounded-lg mb-4 focus:outline-none ${isTitleFocused ? 'border-blue-500' : 'border-gray-300'}`}
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
          placeholder="Enter title"
        />

        {/* Content Textarea */}
        <textarea
          className={`w-full h-40 p-4 border-2 rounded-lg resize-none mb-4 focus:outline-none ${isContentFocused ? 'border-blue-500' : 'border-gray-300'}`}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onFocus={() => setIsContentFocused(true)}
          onBlur={() => setIsContentFocused(false)}
          placeholder="Write your note here..."
        ></textarea>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSaveNote}
            className="flex items-center text-green-800 hover:text-green-900 font-semibold px-4 py-2 rounded-lg border-2 border-green-800 hover:bg-green-100 transition duration-300 ease-in-out"
          >
            <FaSave className="mr-2 text-lg" /> {/* Save icon with margin */}
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
