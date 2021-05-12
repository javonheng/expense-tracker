var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    name:{
        type: String,
        unique : true,
        required : true
    },
    expense: {
        type: Number,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = expenseSchema;