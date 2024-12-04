import React, { useEffect, useState } from 'react';

const Receipt = ({ playlist }) => {
    const [userData, setUserData] = useState(null);

    const timeSum = (previousTotal, timeToAdd) => {
        const time1 = previousTotal.split('.');
        const time2 = timeToAdd.split('.');
        
        let secondSum = Number(time1[1]) + Number(time2[1]);
        let minSum = Number(time1[0]) + Number(time2[0]);
        
        if(secondSum > 59){
          secondSum = Math.abs(60 - secondSum);
          minSum += 1;
        }
        
        if(secondSum < 10){
          secondSum = `0${secondSum}`;
        }
        
        // if(minSum < 10){
        //   minSum = `0${minSum}`;
        // }
        
        return `${minSum}.${secondSum}`;   
    }

    useEffect(() => {
        // Fetch user data from local storage
        const data = JSON.parse(localStorage.getItem('userData'));
        console.log('Fetched userData from localStorage:', data); // Log the fetched data
        if (data) {
            setUserData(data);
        } else {
            console.error('No userData found in localStorage.'); // Log an error if no data is found
        }
    }, []);

    const renderPlaylist = (playlist) => {
    let totalPrice = '0.00'; // Initialize total price for the current playlist

    return (
        <div>
            <div className='playlist-outer'>
                <div key={playlist.id} className="playlist-container border p-3 mt-3 receipt-font">
                    <img src={playlist.imageUrl} alt="Playlist image from Spotify" className="playlist-image" />
                    <h3>{playlist.name}</h3>
                    <ul id="songList" className="list-unstyled">
                        {playlist.tracks.map((track) => {
                            totalPrice = timeSum(totalPrice, track.duration);
                            return (
                                <li key={track.id} className="song-item d-flex justify-content-between align-items-end">
                                    <div className="text-left wrap-indent">
                                        <span>{track.name}</span>
                                        <span className="mx-2 artist-font">by {track.artist || 'Unknown Artist'}</span>
                                    </div>
                                    <span className="text-right">${track.duration}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <h4>Total: ${totalPrice}</h4>
                    {playlist.lyrics && (
                        <p style={{ fontSize: '0.8em' }}>
                            "{playlist.lyrics.lyrics}" - {playlist.lyrics.artist}
                        </p>
                    )}
                    <img src={playlist.qrCode} alt="Scannable QR Code with link to the playlist" className="codes" />
                    <img src={playlist.spotifyCode} alt="Scannable Spotify Code with link to the playlist" className="codes" />
                </div>
            </div>
            {/* <div className="text-center mt-3">
                {isEditing ? (
                    <div>
                        <textarea
                            value={editedComment}
                            onChange={handleCommentChange}
                            rows="3"
                            className="form-control"
                        />
                        <button onClick={handleSaveComment} className="btn btn-success mt-2">Save Comment</button>
                    </div>
                ) : (
                    <div>
                        <p className='playlist-comment'>{playlist.comment}</p>
                        <button onClick={handleEditClick} className="btn btn-secondary">Edit Comment</button>
                    </div>
                )}
            </div> */}
            <div>
                <p className='playlist-comment'>{playlist.comment}</p>
                {/* <button onClick={handleEditClick} className="btn btn-secondary">Edit Comment</button> */}
            </div>
        </div>
    );
};

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
            {userData ? (
                <div className="text-center">
                    {/* <h2>Welcome, {userData.name}!</h2>
                    <p>Email: {userData.email}</p> */}
                    {userData.image && <img src={userData.image} alt="Profile" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px' }} />}
                    {playlist ? (
                        renderPlaylist(playlist) // Render the passed playlist
                    ) : (
                        <p>No playlist data available.</p>
                    )}
                    <div className="text-center mt-3">
                        <a href="/userProfile" className="btn btn-primary">Go Back</a>
                    </div>
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};

export default Receipt;