var Expenses = require('./expense.dao');

exports.createExpense = function (req, res, next) {
    var expense = {
        name: req.body.name,
        expense: req.body.expense
    };

    Expenses.create(expense, function(err, expense) {
        if(err) {
            res.json({
                error : err
            })
            return;
        }
        res.json({
            message : "Expense created successfully"
        })
    })
}

exports.getExpenses = function(req, res, next) {
    Expenses.get({}, function(err, expense) {
        if(err) {
            res.json({
                error: err
            })
            return;
        }
        res.json({
            expense: expense
        })
    })
}

exports.getExpense = function(req, res, next) {
    Expenses.get({name: req.params.name}, function(err, expense) {
        if(err) {
            res.json({
                error: err
            })
            return;
        }
        res.json({
            expense: expense
        })
    })
}

exports.updateExpense = function(req, res, next) {
    var newExpense = {
        name: req.body.name,
        expense: req.body.expense
    }
    Expenses.update({_id: req.params.id}, newExpense, function(err, expense) {
        if(err) {
            res.json({
                error : err
            })
            return;
        }
        res.json({
            message : "Expense updated successfully"
        })
    })
}

exports.removeExpense = function(req, res, next) {
    Expenses.delete({_id: req.params.id}, function(err, expense) {
        if(err) {
            res.json({
                error : err
            })
            return;
        }
        res.json({
            message : "Expense deleted successfully"
        })
    })
}