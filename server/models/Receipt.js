import { Schema, model } from 'mongoose';

import lyricsSchema from './Lyrics.js';
import tracksSchema from './Tracks.js';

const receiptSchema = new Schema({
    // playlists: {},
    imageUrl: {
        type: String,
        required: true
    },
    lyrics: {lyricsSchema},
    // lyrics: lyricsSchema,
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    spotifyCode: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    tracks: [tracksSchema],
    uri: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

});

const Receipt = model('Receipt', receiptSchema);

export default Receipt;