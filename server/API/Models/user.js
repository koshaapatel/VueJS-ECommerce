const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email : {type: String,
            required: true,
            match: /[a-zA-Z\_\-\.\d]{1,}[@][a-zA-Z\_\-\d]{1,}[\.][a-z]{2,4}$/},
            password: {type: String, required: true},
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            addressLine1: {type: String},
            addressLine2: {type: String},
            city: {type:String},
            province: {type:String},
            postalCode: {type:String},
            country: {type:String}
});

module.exports = mongoose.model('User', userSchema);