import React, { Component } from 'react'
import {Card,Button,Input,Form} from 'antd'

import { Link } from 'react-router-dom'


import './login.less'
export default class Register extends Component {
    render() {
        return (
            <div className="_Login">
                <Card>
                    <h1>
                        Register
                    </h1>
                    <form method="Post" action="/Register">
                        <Form.Item>
                            <label>Name</label>
                            <Input name="name" type="text"></Input>
                        </Form.Item>

                        <Form.Item>
                            <label>Email</label>
                            <Input name="email" type="email"></Input>
                        </Form.Item>

                        <Form.Item>
                            <label>Password</label>
                            <Input name="pass" type="password"></Input>
                        </Form.Item>
                        <Form.Item>
                            <label>Re Enter Password</label>
                            <Input type="password"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                        <span>
                            if you are registerd already please <Link  to="/login">Login</Link>
                        </span>
                    </form>
                </Card>
            </div>
        )
    }
}
