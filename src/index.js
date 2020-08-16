import React from "react"              
import ReactDom from "react-dom"
import { Layout,Menu,Badge, Button,Input, Avatar,Popover } from 'antd'; 


import {HomeOutlined,ShopOutlined,LoginOutlined,ShoppingCartOutlined} from "@ant-design/icons"
const { SubMenu } = Menu;
const {Header,Content} = Layout;

import {Get} from './content/funcs'

import {Home} from "./content/Home"
import {Store} from "./content/Store"
import Login from './content/Login'
import Register from './content/Register'
import Cart from "./content/Cart"

import Order from './content/Order'

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
            sessionID:sessionID,
            cart:[],
           
        }
    }
    componentWillMount(){
        
        for(var _e in cart){
            Get(`/api.products/${cart[_e]}`,(data)=>{
                var _Cart=this.state.cart.slice()
                _Cart.push(data)
                this.setState({
                    cart:_Cart,
                    
                },()=>{
                    console.log(this.state.cart)
                }
                )
            })
        }
        
    }
    render(){
        var LoginData=()=>{
           
            if(this.state.UserData){
                const content = (
                    <div style={{display:"inline-block",}}>
                        <div>
                            <span>{this.state.UserData.name}</span><br/>
                            <span>{this.state.UserData.email}</span>
                        </div>
                        <div>
                            <Button type="dashed">Logout</Button>
                        </div>
                    </div>
                  );
                return(<div style={{display:"inline-block",cursor:"pointer"}}> 
                        <Popover content={content}>
                            <Avatar><LoginOutlined/></Avatar>
                        </Popover>
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
        var AddtoCart=(arr)=>{
            Get(`/api.products/${arr}`,(data)=>{
                var cart=this.state.cart.slice()
                cart.push(data)
                this.setState({
                   cart:cart
               },
               ()=>{
                   console.log(this.state.cart)
               })
            })
               
            }
        var RemoveFromCart=(arr)=>{
            var cart=this.state.cart.slice()
                cart.splice(cart.indexOf(arr),1)
                this.setState({
                   cart:cart
               },
               ()=>{
                   console.log(this.state.cart)
               })
        }
        var opnOdr=()=>{
            this.setState({
                opnOrd:true
            })
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
                           <Popover  placement="bottom" getPopupContainer={trigger => trigger.parentNode} content={<Cart RemoveFromCart={RemoveFromCart}  cart={this.state.cart}/>}>
                                <Badge count={this.state.cart.length}>
                                    <Button shape="circle" icon={<ShoppingCartOutlined />}></Button>
                                </Badge>
                           </Popover>
                            {this.state.opnOdr&&<Order></Order>}
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
                                <Store a="df" AddtoCart={AddtoCart} cart={this.state.cart} />
                            </Route>
                            <Route path="/login">
                               <Login/>
                            </Route>
                            <Route path="/register">
                               <Register/>
                            </Route>
                            <Route path="/_getOrder">
                               <Order Cart={this.state.cart} />
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

exports.App=App



ReactDom.render(<App/>,document.getElementById("cont"))