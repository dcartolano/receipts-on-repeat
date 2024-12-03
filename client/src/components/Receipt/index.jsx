import React, { useEffect, useState } from 'react';

const Receipt = () => {
    const [userData, setUserData] = useState(null);
    const [total, setTotal] = useState(0); // State to hold the total price

    useEffect(() => {
        // Fetch user data from local storage
        const data = JSON.parse(localStorage.getItem('userData'));
        if (data) {
            setUserData(data);
        }
    }, []);

    const renderPlaylist = (playlist) => {
        let totalPrice = 0; // Initialize total price for the current playlist

        return (
            <div key={playlist.playlist.id}>
                <h3>{playlist.playlist.name}</h3>
                <ul id="songList">
                    {playlist.tracks.items.map((track) => {
                        const fakePrice = (Math.random() * 10 + 1).toFixed(2); // Generate a fake price
                        totalPrice += parseFloat(fakePrice); // Accumulate total price
                        console.log('Playlist:', playlist);
                        console.log('Tracks:', playlist.tracks.items);
                        return (
                            
                            <li key={track.track.id} className="song-item d-flex justify-content-between">
                                <span className="text-left">{track.track.name}</span>
                                <span className="text-right">${fakePrice}</span>
                            </li>
                        );
                    })}
                </ul>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                {playlist.lyrics && (
                    <p style={{ fontSize: '0.8em' }}>
                        "{playlist.lyrics.lyrics}" - {playlist.lyrics.artist}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div>
            {userData ? (
                <div>
                    <h2>Welcome, {userData.name}!</h2>
                    <p>Email: {userData.email}</p>
                    {userData.image && <img src={userData.image} alt="Profile" style={{ display: 'block' }} />}
                    {userData.playlists.length > 0 ? (
                        renderPlaylist(userData.playlists[0]) // Display the first playlist
                    ) : (
                        <p>No playlists available.</p>
                    )}
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};

export default Receipt;