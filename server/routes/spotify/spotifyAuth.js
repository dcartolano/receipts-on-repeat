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

router.route('/callback').get(async(req, res) => {
    const code = req.query.code || null;

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
        const body = await response.json();

        if (response.ok) {
            const access_token = body.access_token;

            const userOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + access_token }
            };

            const userResponse = await fetch('https://api.spotify.com/v1/me', userOptions);
            const userBody = await userResponse.json();

            if (userResponse.ok) {
                res.json({
                    name: userBody.display_name,
                    email: userBody.email,
                    image: userBody.images[0]?.url
                });
            } else {
                console.error('Error fetching user profile:', userBody);
                res.send('Error fetching user profile');
            }
        } else {
            console.error('Error exchanging code for token:', body);
            res.send('Error during authentication');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        res.send('Error during authentication');
    }
});

export default router;