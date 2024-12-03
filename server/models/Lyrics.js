import { Schema } from "mongoose";

const lyricsSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
});

export default lyricsSchema;