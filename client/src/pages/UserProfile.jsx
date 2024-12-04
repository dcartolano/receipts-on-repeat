import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from "../components/PlaylistCard/index.jsx";
// import { createReceipt } from "../utils/API.js";
import { createReceipt } from "../utils/Api.js";

const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData?.playlists || [];
    //     console.log(playlists);
    const navigate = useNavigate(); // Hook to access the navigate function

    // const handlePlaylistClick = (playlist) => {
        const handlePlaylistClick = async (playlist) => {
            try {
                const response = await createReceipt(playlist);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                console.log(response);
            } catch (err) {
                console.error(err);
            };

            localStorage.setItem('selectedPlaylist', JSON.stringify(playlist)); // Store the selected playlist
            navigate('/playlistReceipt'); // Navigate to PlaylistReceipt
        };

        //     const newReceipt = async () => {
        // try {
        //     const response = await createReceipt(playlists[1]);

        //     if (!response.ok) {
        //       throw new Error('something went wrong!');
        //     }

        //     console.log(response);
        //   } catch (err) {
        //     console.error(err);
        //   }
        //     }

        return (
            <div>

                <div className='playlist-buttons-outer'>
                    <p>Your Playlists!</p>
                    {playlists.length > 0 ? (
                        playlists.map((playlist, index) => (
                            <div className='playlist-button-item' key={index} onClick={() => handlePlaylistClick(playlist)}>
                                <PlaylistCard
                                    // key={index}
                                    playlistName={playlist.name}
                                />
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>Please sign in to view your playlists!</p>
                        </div>
                    )}
                    {/* <p>hello world!</p>
                 <button onClick={newReceipt}>test and store a receipt</button> */}

                </div>
            </div>
        );
    }

    export default UserProfile;