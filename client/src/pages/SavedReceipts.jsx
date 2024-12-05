import React, { useEffect, useState } from 'react';
import Receipt from "../components/Receipt/index.jsx";

const SavedPlaylistReceipts = () => {
    const [playlistId, setPlaylistId] = useState(null);
    
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        // Retrieve the selected playlist ID from local storage
        const selectedPlaylist = JSON.parse(localStorage.getItem('selectedPlaylist'));
        if (selectedPlaylist) {
            setPlaylistId(selectedPlaylist.id); // Assuming selectedPlaylist has an id property
        }
    }, []);

    return (
        <div>
            <Receipt playlist={playlistId} userData={userData} /> {/* Pass the fetched playlist and user data to Receipt */}
        </div>
    );
}

export default SavedPlaylistReceipts;