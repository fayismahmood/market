import React from "react"
import { Layout,Menu, Button } from 'antd';
import {HomeOutlined,ShopOutlined} from "@ant-design/icons"
import "./header.less"
const { SubMenu } = Menu;
const {Header} = Layout;


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class MHeader extends React.Component{
    constructor(prop){
        super(prop)
    }
    render(){
        return(
            <>
                <Header style={{display:"flex"}}>
                    <div style={{color:"white"}}>
                        SFH
                    </div>
                    <Router>
                    <Menu style={{width:"200px",marginLeft:"80px"}} theme="dark"  mode="horizontal">
                       
                            <Menu.Item key="Home" icon={<HomeOutlined />}>
                                <Link to="/about">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="Store" icon={<ShopOutlined />}>
                                Store
                            </Menu.Item>
                        
                    </Menu>
                    </Router>

                </Header>
            </>
        )
    }
}

exports.Header=MHeader