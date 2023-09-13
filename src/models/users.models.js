import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        uniquie: true
    },
    email:{
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = model('user',userSchema);
export default userModel;