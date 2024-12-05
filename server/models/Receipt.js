import { Schema, model } from 'mongoose';

import lyricsSchema from './Lyrics.js';
import tracksSchema from './Tracks.js';

const receiptSchema = new Schema({
    comment: {
        type: String,
        required: false,
        unique: false,
        index: false
    },
    imageUrl: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    lyrics: lyricsSchema,
    name: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    owner: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    qrCode: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    spotifyCode: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    total: {
        type: Number,
        required: true,
        unique: false,
        index: false
    },
    tracks: [tracksSchema],
    uri: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    url: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
});

const Receipt = model('Receipt', receiptSchema);

export default Receipt;