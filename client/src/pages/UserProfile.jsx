import React from 'react';
import PlaylistCard from "../components/PlaylistCard/index.jsx";

const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Check if userData and playlists exist
    const playlists = userData?.playlists || [];

    return (
        <div>
            {playlists.length > 0 ? (
                playlists.map((playlist, index) => (
                    <PlaylistCard
                        key={index} // Add a unique key for each playlist
                        playlistName={playlist.playlist.name}
                    />
                ))
            ) : (
                <div>
                    <p>Please sign in to view your playlists!</p>
                </div>
            )}
            <p>hello world!</p>
        </div>
    );
}

export default UserProfile;