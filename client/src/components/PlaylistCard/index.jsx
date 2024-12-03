const PlaylistCard = ({ playlistName }) => {
    return (
        <div>
            <div className="playlistcard-container">{playlistName}</div>
        </div>
    );
}

export default PlaylistCard;