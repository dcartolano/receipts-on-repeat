import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from "../components/PlaylistCard/index.jsx";
import { createReceipt } from "../utils/Api.js";

const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData?.playlists || [];
    const navigate = useNavigate(); // Hook to access the navigate function

    const handlePlaylistClick = (playlist) => {
        localStorage.setItem('selectedPlaylist', JSON.stringify(playlist)); // Store the selected playlist
        navigate('/playlistReceipt'); // Navigate to PlaylistReceipt
    };

    // Define gradient classes
    const gradientClasses = [
        'light-blue',
        'orange',
        'red',
        'green',
        'purple'
    ];

    return (
        <div className="container mt-5">
            <div className='welcomeUser-outer'>
                <div className='welcomeUser'>
                    {userData ? (
                        <div className="text-center">
                            <h2>Welcome, {userData.name}!</h2>
                            <p>Email: {userData.email}</p>
                        </div>
                    ) : (
                        <p>User data not found.</p>
                    )}
                </div>
            </div>
            <div className='playlist-buttons-outer'>
                <p className='bodyText'>Your Playlists!</p>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <button 
                            className={`playlist-button-item ${gradientClasses[index % gradientClasses.length]}`} 
                            key={index} 
                            onClick={() => handlePlaylistClick(playlist)}
                        >
                            <PlaylistCard playlistName={playlist.name}/>
                        </button>
                    ))
                ) : (
                    <div>
                        <p>Please sign in to view your playlists!</p>
                    </div>
                )}
            </div>
            <a href="/" className="btn btn-primary userProfile-button">Go Back</a>
        </div>
    );
}

export default UserProfile;