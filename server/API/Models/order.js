const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    product: {type: String},
    quantity: {type: Number}
    //totalPrice: {type: Number}
});

module.exports = mongoose.model('Order', orderSchema);