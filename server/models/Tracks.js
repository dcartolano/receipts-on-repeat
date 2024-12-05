import { Schema } from "mongoose";

const tracksSchema = new Schema({
    artist: {
        type: String,
        unique: false,
        index: false
        // required: true
    },
    duration: {
        type: String,
        required: true,
        unique: false,
        index: false
    },
    name: {
        type: String,
        required: true,
        unique: false,
        index: false
    },

});

export default tracksSchema;