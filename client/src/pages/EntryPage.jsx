import React from 'react';
import { useNavigate } from 'react-router-dom';

const EntryPage = () => {
   const navigate = useNavigate();

   const handleNavigate = () => {
       navigate('/login'); // Navigate to HomePage
   };

   return (
       <div className='entry-page-welcome-box-outer'>
           <div className='entry-page-welcome-box'>
               {/* <h1 className='entry-page-text'>Welcome to Reciepts on Repeat. We love music and hope you do to! Our purpose was to create a way of viewing music playlists that is enjoyable through and through</h1> */}
               <h1 >Welcome to Receipts on Repeat! </h1>
               <h2 className='entry-page-text'>We're Jake and Dave, a couple of coding students who made this web app to give you a fun new way to visualize your playlists- all you need is a Spotify account to get started.</h2>
               <p>And if signing into your Spotify through a random web app freaks you out a little bit, no worries, we totally get it- that's why we designed this app so only you will have access to the data Spotify provides, unless you decide to post one of your playlists to the public "Saved Playlists" page.</p>
               {/* <h2 className='entry-page-text'>Thanks for visiting, and we hope you enjoy this app as much as we have building it!</h2> */}
               <p>Thanks for visiting, and we hope you'll enjoy this app as much as we do.</p>
               <button onClick={handleNavigate} className='entry-button'>Click here to begin!</button>
           </div>
       </div>
   );
};

export default EntryPage;