import { Schema } from "mongoose";

const lyricsSchema = new Schema({
    artist: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    lyrics: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
});

export default lyricsSchema;