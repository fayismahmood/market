import React from "react"              
import ReactDom from "react-dom"
import { Layout,Menu, Button,Input, Avatar } from 'antd'; 


import {HomeOutlined,ShopOutlined,LoginOutlined,ShoppingCartOutlined} from "@ant-design/icons"
const { SubMenu } = Menu;
const {Header,Content} = Layout;


import {Home} from "./content/Home"
import {Store} from "./content/Store"
import Login from './content/Login'
import Register from './content/Register'


import "./index.less"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class App extends React.Component{
    constructor(){
        super()
        this.state={
            UserData:data,
            sessionID:sessionID
        }
    }
    render(){
        var LoginData=()=>{
            if(this.state.sessionID){
              return(<div>
                        <Avatar>fg</Avatar>
                        <div>
                            <span>{this.state.UserData.name}</span><br/>
                            <span>{this.state.UserData.email}</span>
                        </div>
                    </div>)
            }else{
                return( 
                <Link to="/login">
                <Button type="primary" icon={<LoginOutlined />}>
                    Login
                </Button>
            </Link>)
            }
        }
        return(
            <Router>
                <Layout>
                    <Header style={{display:"flex",position:"fixed",zIndex:"30",width:"100%"}}>
                        <div className="HeadLogo">
                            NAAAme
                        </div>
                        <Menu style={{width:"200px",marginLeft:"80px"}} theme="dark"  mode="horizontal">
                            <Menu.Item key="Home" icon={<HomeOutlined />}>
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="Store" icon={<ShopOutlined />}>
                                <Link to="/store">Store</Link>
                            </Menu.Item>         
                        </Menu>
                        <div className="Head_tool">
                            {LoginData()}
                           
                            
                            <Button shape="circle" icon={<ShoppingCartOutlined />}></Button>
                            <Input.Search style={{borderRadius:"10px"}}
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                            />
                        </div>
                    </Header>
                    <Content style={{marginTop:"64px"}}>
                        <Switch>
                            <Route path="/store">
                                <Store />
                            </Route>
                            <Route path="/login">
                               <Login/>
                            </Route>
                            <Route path="/register">
                               <Register/>
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        )
    }
    
}


ReactDom.render(<App/>,document.getElementById("cont"))