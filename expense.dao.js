var mongoose = require('mongoose');
var expenseSchema = require('./expense.model');

expenseSchema.statics = {
    create : function(data, cb) {
        var expense = new this(data);
        expense.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var expensesModel = mongoose.model('expense', expenseSchema);
module.exports = expensesModel;