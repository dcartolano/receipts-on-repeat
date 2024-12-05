import React, { useEffect, useState } from 'react';
import { deleteComment, deleteReceipt } from '../../utils/Api';

const SavedReceipt = (receipt) => {
    // const [userData, setUserData] = useState(null);

    // console.log(receipt)
    // console.log(receipt.receipt)

    const playlist = receipt.receipt;

    const timeSum = (previousTotal, timeToAdd) => {
        const time1 = previousTotal.split('.');
        const time2 = timeToAdd.split('.');

        let secondSum = Number(time1[1]) + Number(time2[1]);
        let minSum = Number(time1[0]) + Number(time2[0]);

        if (secondSum > 59) {
            secondSum = Math.abs(60 - secondSum);
            minSum += 1;
        }

        if (secondSum < 10) {
            secondSum = `0${secondSum}`;
        }

        return `${minSum}.${secondSum}`;
    }

    const handleCommentDelete = async (playlistId) => {
        try {
            const response = await deleteComment(playlistId);
            // console.log(response);
            // if (!response.ok) {
            //     throw new Error('something went wrong!');
            // }
        } catch (err) {
            console.error(err);
        };
        window.location.reload();
    };

    const handleReceiptDelete = async (playlistId) => {
        try {
            const response = await deleteReceipt(playlistId);
            // console.log(response);
            // if (!response.ok) {
            //     throw new Error('something went wrong!');
            // }
        } catch (err) {
            console.error(err);
        };
        window.location.reload();
    };

    let totalPrice = '0.00'; // Initialize total price for the current playlist

    return (

        <div>
            <div className='playlist-outer'>
                <div key={playlist.id} className="playlist-container border p-3 mt-3 receipt-font">
                    <img src={playlist.imageUrl} alt="Playlist image from Spotify" className="playlist-image" />
                    <h3 className='receipt-playlist-name'>{playlist.name}</h3>
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
                    <div className='codes-section'>
                        <img src={playlist.qrCode} alt="Scannable QR Code with link to the playlist" className="codes qr-code" />
                        <img src={playlist.spotifyCode} alt="Scannable Spotify Code with link to the playlist" className="codes spotify-scannable-code" />
                    </div>
                    
                </div>
                <div className='playlist-comment'>
                    {playlist.comment ? (
                        <div>
                        <p className='playlist-comment'>{playlist.comment}</p>
                        <button onClick={() => handleCommentDelete(playlist._id)} className="btn btn-secondary comment-button">Delete Comment</button>
                        <button onClick={() => handleReceiptDelete(playlist._id)} className="btn btn-secondary comment-button">Delete Receipt</button>
                        </div>
                    ) : (
                        <button onClick={() => handleReceiptDelete(playlist._id)} className="btn btn-secondary">Delete Receipt</button>
                    )}
                
                {/* <button onClick={() => handleReceiptDelete(playlist._id)} className="btn btn-secondary">Delete Receipt</button> */}
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
            {/* <div>
                <p className='playlist-comment'>{playlist.comment}</p>
                <button onClick={() => handleCommentDelete(playlist._id)} className="btn btn-secondary">Delete Comment</button>
                <button onClick={() => handleReceiptDelete(playlist._id)} className="btn btn-secondary">Delete Receipt</button>
            </div> */}
        </div>
    );
};

export default SavedReceipt;