import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/auth', (_req, res) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  // send the POST request
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const token = body.access_token; // get the access token
      res.json({ token: token }); // send the token back to the client
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

export default router;