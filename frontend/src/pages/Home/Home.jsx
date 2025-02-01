import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NotesList from '../../components/NotesList';
import Addnote from '../../components/Addnote';
import { isAuthenticated } from '../../authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log("User Authenticated:", isAuthenticated());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && localStorage.getItem('loginSuccess')) {
      setTimeout(() => {
        setShowAlert(true);
        localStorage.removeItem('loginSuccess');
      }, 400); 
    }
  }, [isLoading]);

  useEffect(() => {
    if (showAlert) {
      // Simple toast with auto-close and no progress bar
      toast.success('Login Successful. Welcome!', {
        position: "top-right",
        autoClose: 3000, // Toast auto-closes after 3 seconds
        hideProgressBar: true, // No progress bar
        closeButton: true, // Make sure the close button is there
        onClose: () => setShowAlert(false), // Set state to hide alert after toast is closed
      });
    }
  }, [showAlert]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-6 items-center justify-center">Loading...</p>
        </div>
      ) : (
        <>
          <Navbar />
          <NotesList />
          <Addnote />
        </>
      )}
      
      {/* Add ToastContainer here */}
      <ToastContainer />
    </>
  );
};

export default Home;
