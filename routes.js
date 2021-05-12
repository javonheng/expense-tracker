var Expenses = require('./expense.controller');
var User = require('./user.controller');

module.exports = function(router) {
    router.post('/create', Expenses.createExpense);
    router.get('/get', Expenses.getExpenses);
    router.get('/get/:name', Expenses.getExpense);
    router.put('/update/:id', Expenses.updateExpense);
    router.delete('/delete/:id', Expenses.removeExpense);

    router.post('/createUser', User.createUser);
    router.get('/getUsers', User.getUsers);
    router.post('/getUser', User.getUser);
    router.put('/updateUser/:id', User.updateUser);
    router.delete('/deleteUser/:id', User.removeUser);
}