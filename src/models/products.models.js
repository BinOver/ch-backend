import { Schema, model } from  'mongoose';
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        require: true
        },
    description: {
        type: String,
        require: true
        },
    price: {
        type: Number,
        require: true
        },
    stock: {
        type: Number,
        require: true
        },
    category:  {
        type: String,
        require: true,
        index: true
        },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
    code: {
        type: String,
        unique: true
    },
    thumbnails: []
});

productSchema.plugin(paginate);

const productModel = model('products', productSchema);
export default productModel;