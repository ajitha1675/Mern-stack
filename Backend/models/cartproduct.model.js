import mongoose from "mongoose";

const cartProductschema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    },
    quantity:{
        type: Number,
        default: 1
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
},{timestamps: true})

const cartProductModel = mongoose.model('cartProduct', cartProductschema)

export default cartProductModel;