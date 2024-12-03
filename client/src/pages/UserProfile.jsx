import PlaylistCard from "../components/PlaylistCard/index.jsx";

const UserProfile = () => {

    // if (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData.playlists;
    // let playlists = [];
    // console.log(playlists.playlist[0].name)


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
            <p>hello world!</p>
        </div>
    )
}

export default UserProfile;