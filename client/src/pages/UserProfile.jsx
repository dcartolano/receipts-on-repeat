import PlaylistCard from "../components/PlaylistCard/index.jsx";

const UserProfile = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData.playlists;


    return (
        <div>
            {playlists ? playlists.map((playlist) => {
                <PlaylistCard
                    playlistName={playlist.playlist.name}
                />
            })
                :
                <div>
                    <p>please sign in to view your playlists!</p>
                </div>
            }

        </div>
    )
}

export default UserProfile;