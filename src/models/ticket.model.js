import { Schema, model } from  'mongoose';
import paginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new Schema({
    purchase_datetime:  {
        type: Date,
        default: Date.now,
        },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
    },
    code: {
        type: String,
        unique: true
    }
});

ticketSchema.plugin(paginate);

ticketSchema.pre('save', function(next) {
    const randomCode = uuidv4();
    this.code = randomCode;
    next();
});

const ticketModel = model('tickets', ticketSchema);
export default ticketModel;