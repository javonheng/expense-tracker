import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Typography, Card, Button } from 'antd';
import axios from 'axios';

async function loginUser(credentials) {
    return axios.post('/api/createUser/', {
        user: credentials.username,
        password: credentials.password
    })
        .then(res => console.log(res.data));
}

function Login({ setToken, setUser, createFirstExpense }) {

    const history = useHistory();
    const { Title } = Typography;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = async e => {
        // e.preventDefault();
        await loginUser({
            username,
            password
        });
        createFirstExpense();
        history.push('/');
    }
    const redirectLogin = () => {
        history.push('/');
    }

    return (
        <React.Fragment>
        <Title style={{marginTop: 50}}>SIGN UP</Title>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Button block onClick={redirectLogin}>Back To Login</Button>
            </Card>
        </React.Fragment>
    );
}

export default Login;
