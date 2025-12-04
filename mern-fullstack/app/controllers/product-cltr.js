const Product = require('../models/product-model');

const productCltrs = {};

productsCltr.create = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const product = new Product({
            name,
            price,
            description,
            isApproved: req.role === 'admin', // true if admin, false if moderator
            isDeleted: false
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong while creating the product' });
    }
};

module.exports = productCltrs;