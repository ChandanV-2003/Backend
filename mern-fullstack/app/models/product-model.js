const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    // image: String,
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Product = model('Product', productSchema);
module.exports = Product;