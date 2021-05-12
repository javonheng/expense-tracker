import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Ensure you destructure the createBrowserHistory object
import { Form, Input, Checkbox, Typography, Card, Button } from 'antd';
import axios from 'axios';

function Login({ setToken, setUser, setExpense }) {

    const history = useHistory();
    const { Title } = Typography;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const searchUserFromDBAndGetExpense = () => {
        axios.get('/api/get/' + username)
          .then(res => {
            setExpense(res.data.expense[0].expense);
          })
          .catch(err => console.log("no user found"));
      }

    const handleSubmit = async e => {
        // e.preventDefault();
        await axios.post('/api/getUser/', {
            user: username,
            pass: password
        })
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user.user);
            })
            .catch(err => history.push('/signup'));
        searchUserFromDBAndGetExpense();
        history.push('/expense');
    }

    const redirectSignUp = () => {
        history.push('/signup');
    }

    return (
        <React.Fragment>
        <Title style={{marginTop: 50}}>LOGIN</Title>
            <Card style={{ width: '50vw', margin: "auto" }}>
                <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                        onChange={e => setUsername(e.target.value)}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        onChange={e => setPassword(e.target.value)}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Log In
                        </Button>
                    </Form.Item>
                </Form>
                <Button block onClick={redirectSignUp}>Sign Up</Button>
            </Card>
        </React.Fragment>
    );
}

export default Login;
