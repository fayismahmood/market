import React, { Component } from 'react'
import {Card,Button,Input,Form,Alert} from 'antd'


import './login.less'
import { Link } from 'react-router-dom'
import { Post } from './funcs'
export default class Login extends Component {
    componentWillMount(){
        Post('../', { answer: 42 })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    }
    render() {
       function alerts(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if(urlParams.get("status")==""||urlParams.get("status")==null){

            }else{
                return (<Alert message={urlParams.get("status")} type="error" />);
            }
           
       }
        return (
            <>
            <div style={{width:"100%"}}>{alerts()}</div>
            <div className="_Login">
                <Card>
                    <h1>
                        Login
                    </h1>
                    <form  method="post" action="../">
                            <Form.Item>
                                <label>Email</label>
                                <Input name="email" type="email"></Input>
                            </Form.Item>
                            
                            <Form.Item>
                                <label>Password</label>
                                <Input name="pass" type="password"></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit">Login</Button>
                            </Form.Item>
                            <span>
                                if you arent registerd already please <Link  to="/register">Register</Link>
                            </span>
                    </form>
                    
                </Card>
            </div>
            </>
        )
    }
}
