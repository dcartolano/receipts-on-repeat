import PlaylistCard from "../components/PlaylistCard/index.jsx";
// import { createReceipt } from "../utils/API.js";
import { createReceipt } from "../utils/Api.js";

const UserProfile = () => {

    // if (localStorage)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const playlists = userData.playlists;
    console.log(playlists);
    // let playlists = [];
    // console.log(playlists.playlist[0].name)

    const newReceipt = async () => {
    try {
        const response = await createReceipt(playlists[1]);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        
        console.log(response);
        // const { token } = await response.json();
        // Auth.login(token);
      } catch (err) {
        console.error(err);
        // setShowAlert(true);
      }
    }

    return (
        <div>
            
            {playlists ? playlists.map((playlist) => {
                <PlaylistCard
                    playlistName={playlist.name}
                />
            })
                :
                <div>
                    <p>please sign in to view your playlists!</p>
                </div>
            }
            <p>hello world!</p>
            <button onClick={newReceipt}>test and store a receipt</button>
        </div>
    )
}

export default UserProfile;