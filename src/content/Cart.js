import React, { Component } from 'react'
import ReactDom from "react-dom"
import { Button } from 'antd'

import Order from "./Order"

import {Get} from './funcs'
import "./cart.less"
import { Link } from 'react-router-dom'

export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            Order:false
        }
        this.getProd=this.getProd.bind(this)
    }
    deleteFromCart(id){
        Post('/_RemoveFromCart', { item: id })
                .then((data) => {
                    this.props.RemoveFromCart(id)
                    //console.log(data); // JSON data parsed by `data.json()` call
                })
        
    }
    
    getProd(){
        return this.props.cart.map(e=>{
            return(
                    <div className="items">
                        <div className="itemName">
                           {e["title"]}
                        </div>
                        <Button onClick={()=>{this.deleteFromCart(e)}} type="primary" danger>X</Button>
                    </div>)
        })
    }
    render() {
        
        return (
            <div className="cartPopover">
                <div className="cartItems">
                    <this.getProd/>
                </div>
                <div className="Action">
                    <Link to="/_getOrder">
                        <Button type="dashed">Order</Button>
                    </Link>
                    
                </div>
               
            </div>
        )
    }
}
