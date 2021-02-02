const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const authenticate = require('../Authentication/auth');

router.get('/', (req, res, next)=> {
    User.find()
    .select()
    .populate('user')
    .exec()
    .then( docs => {
        console.log("Users from Database", docs);
        if(docs.length >= 0){
        const totalUsers = {
            Count: docs.length,
            Users: docs
        };
        res.status(200).json(totalUsers);
        }else{
        res.status(404).json({
            message: 'There are no users to retrieve from database'
        });
        }
    })
    .catch(err => {
            console.log(err);
        res.status(500).json({
            message: err
    });
});   


});

router.post('/signup', (req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Email already exists'
                
            })
        }else{
            const salt = bcrypt.genSaltSync();
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err,
                    });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            addressLine1: req.body.addressLine1,
                            addressLine2: req.body.addressLine2,
                            city: req.body.city,
                            province: req.body.province,
                            postalCode: req.body.postalCode,
                            country: req.body.country
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                        message: 'Enter all the required fileds'
                        });
                    });
                }
            });
        }
    })
    
}); 

router.post('/login', (req, res) => {

    //Use finOne to match only one and remove array for user
    User.find({ email: req.body.email})
    .exec()
    .then( user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Login Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, match) => {
            if (err){
                return res.status(401).json({
                    message: 'Login Failed'
                });
            }
            if(match){
                const loggedUser = user;
               const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                    
                }, 'secret',
                {
                    expiresIn: "2h"
                })
                req.session.user = user[0]._id;
                const loggedEmail = loggedUser;
                console.log(req.session.user);
                return res.status(200).json({
                    message: 'Login Successfull',
                    token: token,
                    user: loggedEmail
                });
            }
            return res.status(401).json({
                message: 'Login Failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Enter all the required fileds'
        });
    });

});

router.patch('/:id', authenticate, (req, res, next) => {
    const userId = req.params.id;
    const updateProperty = {};
    for (const property of req.body ){
        updateProperty[property.newOperation] = property.value;
        }
    Product.findById(userId)
    .exec()
    .then(doc => {
        if(doc){
            User.update({_id: userId}, { $set: updateProperty }).exec();
            console.log(res);
            res.status(200).json({
            message: 'Password has been Updated Successfully'
        });
        }else{
            res.status(404).json({
                message: 'User id is not exist'
            });
        }   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: err
        });
    });
});

router.delete('/:id', (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
    .exec()
    .then(user => {
        if(user){
            User.remove({_id: userId}).exec();
            res.status(200).json({
                message: 'Provided user has been deleted'
            });
        }else{
            res.status(404).json({
                message: 'Provided user id is not listed in the database'
            });
        }  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Enter a valid user id'
        });
    });
});

module.exports = router;
