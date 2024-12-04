import { Schema } from "mongoose";

const tracksSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

});

export default tracksSchema;