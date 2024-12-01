import express from 'express';
import querystring from 'querystring';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const client_id = process.env.CLIENT_ID; 
const redirect_uri = 'http://localhost:3000/callback';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

router.get('/login', function(_req, res) {
    const state = generateRandomString(16); 
    const scope = 'user-read-private user-read-email'; 

    res.redirect('https://accounts.spotify.com/.authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.get('/callback', (req, res) => {
    const code = req.query.code || null;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${process.env.CLIENT_SECRET}`).toString('base64')
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;

            const options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            request.get(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    res.json({
                        name: body.display_name,
                        email: body.email,
                        image: body.images[0]?.url
                    });
                } else {
                    console.error('Error fetching user profile:', error);
                    res.send('Error fetching user profile');
                }
            });
        } else {
            console.error('Error exchanging code for token:', error);
            res.send('Error during authentication');
        }
    });
});

export default router;