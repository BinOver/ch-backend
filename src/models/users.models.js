import { Schema, model } from "mongoose";

const userSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    // username: {
    //     type: String,
    //     required: true,
    //     uniquie: true
    // },
    last_name: {
        type: String,
        required: true
    },
    first_name: {
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
    },
    age:{
        type: String,
        require:true
    },
    rol: {
        type: String,
        default: 'user'
    }
});

const userModel = model('user',userSchema);
export default userModel;