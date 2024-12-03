import React from 'react';
import Receipt from "../components/Receipt/index.jsx";

const PlaylistReceipt = () => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Retrieve the selected playlist from local storage
    const selectedPlaylist = JSON.parse(localStorage.getItem('selectedPlaylist')); 

    return (
        <div>
            <Receipt playlist={selectedPlaylist} userData={userData} /> {/* Pass the selected playlist and user data to Receipt */}
        </div>
    );
}

export default PlaylistReceipt;