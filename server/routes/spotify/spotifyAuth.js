import express from 'express';
import querystring from 'querystring';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

const client_id = process.env.CLIENT_ID; 
const redirect_uri = 'http://localhost:8888/callback'; 

// Function to generate a random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Login route to initiate Spotify authentication
router.get('/login', function(req, res) {
    const state = generateRandomString(16); 
    const scope = 'user-read-private user-read-email'; 

    // Redirect to Spotify's authorization page
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

// Callback route to handle Spotify's response
router.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID.toString('base64') + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true // Automatically stringifies the body to JSON
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token; // Get the access token
            
            res.send('Access Token: ' + access_token); 
        } else {
            console.error('Error exchanging code for token:', error);
            res.send('Error during authentication');
        }
    });
});

export default router;