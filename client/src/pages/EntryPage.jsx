import React from 'react';
import { useNavigate } from 'react-router-dom';

const EntryPage = () => {
   const navigate = useNavigate();

   const handleNavigate = () => {
       navigate('/homePage'); // Navigate to HomePage
   };

   return (
       <div className='entry-page-welcome-box-outer'>
           <div className='entry-page-welcome-box'>
               <h1 className='entry-page-text'>Welcome to Reciepts on Repeat. We love music and hope you do to! Our purpose was to create a way of viewing music playlists that is enjoyable through and through</h1>
               <button onClick={handleNavigate} className='entry-button'>Start My Journey</button>
           </div>
       </div>
   );
};

export default EntryPage;