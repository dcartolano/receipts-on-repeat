import express from 'express';
import querystring from 'querystring';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const client_id = process.env.CLIENT_ID; 
const client_secret = process.env.CLIENT_SECRET; // Ensure CLIENT_SECRET is loaded from .env
const redirect_uri = 'http://localhost:3000/spotify/callback'; // Ensure this matches your redirect URI in Spotify app settings

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

router.route('/login').get((_req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email playlist-read-private'; // Adjust scopes as needed

    res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.route('/callback').get(async (req, res) => {
    const code = req.query.code || null;
    // console.log('Authorization Code:', code); // Log the received authorization code

    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        })
    };

    try {
        const code = req.query.code || null;
        console.log('Authorization Code:', code); // Log the received authorization code

        const authOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            })
        };

        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

        if (!response.ok) {
            const errorBody = await response.text(); // Get the response as text
            console.error('Error exchanging code for token:', errorBody);
            return res.send('Error during authentication: ' + errorBody);
        }

        const body = await response.json();
        // console.log('Token Response:', body); // Log the token response for debugging

        const access_token = body.access_token;

        const userOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token }
        };

        // Fetch user profile
        const userResponse = await fetch('https://api.spotify.com/v1/me', userOptions);
        if (!userResponse.ok) {
            const userErrorBody = await userResponse.text(); // Get the response as text
            console.error('Error fetching user profile:', userErrorBody);
            return res.send('Error fetching user profile: ' + userErrorBody);
        }
        const userBody = await userResponse.json();

        // Fetch user playlists
        const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists?offset=0&limit=5', userOptions); // changed this
        if (!playlistsResponse.ok) {
            const playlistsErrorBody = await playlistsResponse.text(); // Get the response as text
            console.error('Error fetching user playlists:', playlistsErrorBody);
            return res.send('Error fetching user playlists: ' + playlistsErrorBody);
        }
        const playlistsBody = await playlistsResponse.json();
        console.log('playlistsBody on line 89: ', playlistsBody)

        const filteredPlaylists = playlistsBody.items.filter((playlist) => !(!playlist || !playlist.id));

        // Fetch tracks for each playlist
        // const playlistsWithTracks = await Promise.all(playlistsBody.items.map(async (playlist) => {
            const playlistsWithTracks = await Promise.all(filteredPlaylists.map(async (playlist) => {
            // if (!playlist || !playlist.id) {
            //     console.error('Invalid playlist object:', playlist);
            //     continue;
            //     // return { name: 'Unknown Playlist', tracks: [] }; // Return empty tracks for invalid playlists
            // }

            const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, userOptions);
            if (!tracksResponse.ok) {
                const tracksErrorBody = await tracksResponse.text(); // Get the response as text
                console.error('Error fetching tracks for playlist:', tracksErrorBody);
                return { name: playlist.name, tracks: [] }; // Return empty tracks on error
            }
            const tracksBody = await tracksResponse.json();

            if (tracksBody.items[0] && playlist.name != 'Unknown Playlist') {
            //console.log(tracksBody.items[0].track.name)
            // console.log('playlist on line 108: ', playlist)
            // console.log('tracksBody on line 109: ', tracksBody.items)

            return {
                playlist: playlist,
                tracks: tracksBody // Get track names
            };
        }
        }));

        // Store user data and playlists with tracks in local storage
        res.send(`
            <script>
                localStorage.setItem('userData', JSON.stringify({
                    name: '${userBody.display_name}',
                    email: '${userBody.email}',
                    image: '${userBody.images[0]?.url || ''}',
                    playlists: ${JSON.stringify(playlistsWithTracks)}
                }));
                window.location.href = '/userProfile.html'; // Redirect to user profile page
            </script>
        `);
    } catch (error) {
        console.error('Fetch error before token:', error);
        res.send('Error during authentication');
    }
});

router.route('/userProfile').get((req, res) => {
    res.json(req.session.userData); // Send user data as JSON
});

export default router;