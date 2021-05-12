var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModel = new Schema({
    user:{
        type: String,
        unique : true,
        required : true
    },
    password: {
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = userModel;