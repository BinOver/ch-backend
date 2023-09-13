import { Schema, model } from "mongoose";

const messagesSchema = new Schema({ 
    email: {
        type: String,
        required: true
    },
    message: { 
        type: String,
        required: true
    }
});

const messageModel = model('messages', messagesSchema);
export default messageModel;