import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaThumbtack, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const NotesList = ({ notes = [], onDeleteNote, onTogglePin, onEditNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const openModal = (noteId) => {
    setSelectedNoteId(noteId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNoteId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedNoteId) {
      onDeleteNote(selectedNoteId);
    }
    closeModal();
  };

  return (
    <>
      <div className="flex justify-center mt-8 px-4">
        <div className="grid mb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {notes
            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
            .map((note) => (
              <div
                key={note._id} // ✅ Use MongoDB _id as key
                className="bg-white rounded-lg shadow-md p-4 relative transition-all duration-300 ease-in-out hover:shadow-2xl ring-2 ring-blue-500/50 cursor-pointer"
                onClick={() => onEditNote(note)}
              >
                <div
                  className="absolute top-2 right-2 flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={`${
                      note.isPinned ? "text-orange-400" : "text-blue-500"
                    } p-2 rounded-full hover:bg-gray-200 focus:outline-none transition-colors`}
                    title="Pin/Unpin Note"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Prevents triggering onEditNote
                      onTogglePin(note._id); // ✅ Use _id instead of id
                      toast.info(
                        note.isPinned ? "Note unpinned!" : "Note pinned!",
                        { position: "top-right" }
                      );
                    }}
                  >
                    <FaThumbtack className="text-lg" />
                  </button>
                  <button
                    className="text-green-500 hover:text-green-600 p-2 rounded-full hover:bg-green-100 focus:outline-none transition-colors"
                    title="Edit Note"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditNote(note);
                    }}
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 focus:outline-none transition-colors"
                    title="Delete Note"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(note._id); // ✅ Use _id
                    }}
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>

                <h2 className="text-xl font-semibold text-blue-800 border-b-2 mb-3 border-gray-300 pb-3">
                  {note.title || "Untitled Note"}
                </h2>

                <div
                  className="bg-gray-100 p-3 rounded-lg overflow-hidden text-gray-700 mb-4"
                  style={{ height: "120px", width: "100%" }}
                >
                  <p className="text-sm overflow-hidden overflow-ellipsis whitespace-pre-line">
                    {note.content || "No content available."}
                  </p>
                </div>

                {/* Display Created Date */}
                <div className="text-gray-500 text-xs mt-2">
                  Created on:{" "}
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg mx-4 p-6 w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg text-blue-700 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default NotesList;
