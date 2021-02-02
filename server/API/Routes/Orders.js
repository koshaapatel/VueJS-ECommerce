const express = require('express');
//Enabling router
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../Authentication/auth');
const Cart = require('../Models/cart');
const Order = require('../Models/order');
const Product = require('../Models/product');


router.get('/', (req, res, next) => {
    Order.find({user: req.session.user})
    .select('_id product user productName quantity')
    .populate('order', 'name price shippingCost').populate('user', 'email')
    .exec()
    .then( docs => {
        console.log("Orders Retrieved from Database", docs);
        console.log(req.session.user);
        if(docs.length >= 0){
        const totalOrders = {
            Count: docs.length,
            Carts: docs
        };
        res.status(200).json(totalOrders);
        }else{
        res.status(404).json({
            message: 'There are no orders to retrieve from database'
        });
        }
        })
    .catch(err => {
            console.log(err);
        res.status(500).json({
            message: 'Please login to see the orders'
    });
});   
});

router.post('/', (req, res, next) => {
     try{
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            user: req.body.user,
            productId: req.body.product,
            product: req.body.product,
            quantity: req.body.quantity
            //totalPrice: cart.quantity * productId.price 
            });
            order.save();
        console.log(res.status);
        // Cart.findByIdAndDelete(req.body.cartId).exec();
        res.status(200).json({
            message : 'Order has been placed',
            orderId: 'Order ID:'+ order._id
        });

    } catch(err) {
            res.status(500).json({
            message: 'Please provide a valid cart id to place order',
            error: console.trace()
             });
        }    
    });    
module.exports = router;