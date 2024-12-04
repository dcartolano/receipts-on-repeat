import express from 'express';
import querystring from 'querystring';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

import {
    getAllReceipts,
    createReceipt,
} from '../../controllers/receipt-controller.js';

router.route('/receipts').get(getAllReceipts).post(createReceipt);

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET; // Ensure CLIENT_SECRET is loaded from .env
// let redirect_uri;
// if (process.env.NODE_ENV != 'production') {
//     redirect_uri = 'http://localhost:3000/spotify/callback'; // Ensure this matches your redirect URI in Spotify app settings
// } else {
//     redirect_uri = 'https://receipts-on-repeat-reloaded.onrender.com/spotify/callback'; // Ensure this matches your redirect URI in Spotify app settings
// }
const redirect_uri = process.env.REDIRECT_URI;


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
        // console.log('playlistsBody on line 89: ', playlistsBody)

        const filteredPlaylists = playlistsBody.items.filter((playlist) => !(!playlist || !playlist.id));

        // Fetch tracks for each playlist
        const playlistsWithTracks = await Promise.all(filteredPlaylists.map(async (playlist) => {
            // // LEAVING IN CASE WE WANT TO GO BACK TO UTILIZING THIS METHOD THAT JAKE HAD ORIGINALLY SET UP
            // const playlistsWithTracks = await Promise.all(playlistsBody.items.map(async (playlist) => {
            // if (!playlist || !playlist.id) {
            //     console.error('Invalid playlist object:', playlist);
            //     continue;
            //     // return { name: 'Unknown Playlist', tracks: [] }; // Return empty tracks for invalid playlists
            // }

            const encodedPlaylistUrl = encodeURIComponent(playlist.external_urls.spotify);
            const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${encodedPlaylistUrl}&size=100x100`;
            const spotifyCode = `https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${playlist.uri}`;

            const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, userOptions);
            if (!tracksResponse.ok) {
                const tracksErrorBody = await tracksResponse.text(); // Get the response as text
                console.error('Error fetching tracks for playlist:', tracksErrorBody);
                return { name: playlist.name, tracks: [] }; // Return empty tracks on error
            }
            const tracksBody = await tracksResponse.json();

            let lyricsObject;
            let lyricsResponseOk = false;
            let i = 0;
            while (!lyricsResponseOk) {
                const randomNumber = Math.floor(Math.random() * tracksBody.items.length);
                console.log(randomNumber);

                console.log('tracksbody.items[randomNumber].track.name: ', tracksBody.items[randomNumber].track.name);

                const randomTitle = await tracksBody.items[randomNumber].track.name;
                const randomArtist = await tracksBody.items[randomNumber].track.artists[0].name;

                const lyricsResponse = await fetch(`https://api.lyrics.ovh/v1/${randomArtist}/${randomTitle}`);
                ++i;
                if (lyricsResponse.ok) {
                    const randomLyrics = await lyricsResponse.json();
                    const splitRandomLyrics = await randomLyrics.lyrics.split(/\r?\n/);
                    lyricsObject = {
                        lyrics: splitRandomLyrics[0],
                        artist: randomArtist
                    }
                    lyricsResponseOk = true;
                }
                else if (i > 5) {
                    lyricsObject = {
                        lyrics: "If at first you don't succeed...",
                        artist: "Jake and Dave"
                    }
                    lyricsResponseOk = true;
                }
            }

            const pad = (num) => {
                num = num.toString();
                while (num.length < 2) num = "0" + num;
                return num;
            }

            const lessThanMinute = (duration) => {
                if (duration < 60000) {
                    return duration / 1000
                } else {
                    return ((duration / 1000 / 60) % (Math.floor((duration / 1000 / 60)))) * (60)
                }
            }

            const tracksArray = await tracksBody.items.map((item) => {
                return {
                    artist: item.track.artists[0].name,
                    duration: `${Math.floor(item.track.duration_ms / 1000 / 60)}.${pad(Math.floor(lessThanMinute(item.track.duration_ms)))}`,
                    name: item.track.name
                }
            });

            if (playlist.tracks.total > tracksBody.limit) {
                tracksArray.push({
                    artist: `various artists`,
                    duration: '0.00',
                    name: `+ ${playlist.tracks.total - tracksBody.limit} add'l tracks`
                })
            };

            if (tracksBody.items[0] && playlist.name != 'Unknown Playlist') {
                return {
                    url: playlist.external_urls.spotify,
                    imageUrl: playlist.images[0].url,
                    name: playlist.name,
                    owner: playlist.owner.display_name,
                    total: playlist.tracks.total,
                    uri: playlist.uri,
                    tracks: tracksArray,
                    lyrics: lyricsObject,
                    qrCode: qrCode,
                    spotifyCode: spotifyCode,
                    comment: 'Update this sample comment to share your thoughts on this playlist!'
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
                // window.location.href = '/userProfile.html'; // LEAVING THIS LINE IN CASE WE WANT TO GO BACK TO JAKE'S ORIGINAL METHOD
                window.location.assign('/userProfile'); // Redirect to user profile page
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