import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from "../components/PlaylistCard/index.jsx";

const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData?.playlists || [];
    const navigate = useNavigate(); // Hook to access the navigate function

    const handlePlaylistClick = (playlist) => {
        localStorage.setItem('selectedPlaylist', JSON.stringify(playlist)); // Store the selected playlist
        navigate('/playlistReceipt'); // Navigate to PlaylistReceipt
    };

    return (
        <div>
            
            <div className='playlist-buttons-outer'>
                <p>Your Playlists!</p>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div className='playlist-button-item' key={index} onClick={() => handlePlaylistClick(playlist)}>
                            <PlaylistCard
                                playlistName={playlist.playlist.name}
                            />
                        </div>
                    ))
                ) : (
                    <div>
                        <p>Please sign in to view your playlists!</p>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default UserProfile;