import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from 'antd';
import axios from 'axios';
import NumericInput from './NumericInput';

function Expense({user, expense, setExpense, setToken, token, createFirstExpense}) {

  const history = useHistory();
  const { Title } = Typography;
  const [input, setInput] = useState('');
  const [id, setID] = useState('');

  const getExpense = () => {
    axios.get('/api/get/' + user)
      .then(res => {
        setExpense(res.data.expense[0].expense);
        setID(res.data.expense[0]._id);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (!token) history.push('/');
    getExpense();
  });

  const handleChange = value => {
    setInput(value);
  }

  const redirectLogout = () => {
    setToken('');
    history.push('/');
  }

  const addExpense = () => {
    const newExpense = +expense + +input;
    const newData = {
      name: user,
      expense: newExpense
    }
    axios.put('/api/update/' + id, newData)
      .then(res => getExpense())
      .catch(err => console.log("Failed to add"))
    setInput('');
  }

  const minusExpense = () => {
    const newExpense = +expense - +input;
    const newData = {
      name: user,
      expense: newExpense
    }
    axios.put('/api/update/' + id, newData)
      .then(res => getExpense())
      .catch(err => console.log("Failed to minus"))
    setInput('');
  }

  const resetExpense = () => {
    axios.delete('/api/delete/' + id)
      .then(res => {
          createFirstExpense();
          getExpense();
        })
      .catch(err => console.log("Failed to reset"))
    setInput('');
  }

  return (
    <div className="wrapper">
        <Title style={{marginTop: 50}}>EXPENSE TRACKER</Title>
        <Title level={3}>{expense}</Title>
        <br /><br />

        <NumericInput style={{width: 120}} value={input} onChange={handleChange} /><br/><br />
        <Button type="primary" shape="round" onClick={addExpense} style={{marginRight: '2rem'}}>+</Button>
        <Button type="primary" shape="round" onClick={minusExpense} style={{marginRight: '2rem'}}>-</Button>
        <Button type="primary" shape="round" onClick={resetExpense}>Reset</Button><br /><br />

        <Button block onClick={redirectLogout} style={{width: 400}}>Log Out</Button>
    </div>
  );
}

export default Expense;
