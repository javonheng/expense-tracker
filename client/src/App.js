import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Expense from './Expense';
import SignUp from './SignUp';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser ] = useState();
  const [expense, setExpense] = useState(null);

  const createFirstExpense = () => {
    axios.post('/api/create', {
      name: user,
      expense: 0
    })
  }

  if (!token) {
    return (
      <Switch>
        <Route
          path="/"
          exact
        >
          <Login setToken={setToken} setUser={setUser} setExpense={setExpense} />
        </Route>
        <Route
          path="/signup"
          exact
        >
          <SignUp createFirstExpense={createFirstExpense} />
        </Route>
      </Switch>
    )
  }

  return (
    <Expense user={user} expense={expense} setExpense={setExpense} setToken={setToken} token={token} createFirstExpense={createFirstExpense} />
  );
}

export default App;
