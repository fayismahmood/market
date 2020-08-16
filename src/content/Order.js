import React, { Component } from 'react'
import{ Modal,Result, Button,InputNumber} from "antd"
import {Redirect} from "react-router-dom"

import "./Order.less";
import {Post} from "./funcs"


export default class Order extends Component {
    constructor(props){
        super(props)
        this.state={
            cartCount:{}
        }
        
    }
    render() {
        var ChangeVal=(val,e)=>{
           
            var dd=Object.assign({},this.state.cartCount)
            dd[e.id]=val
            this.setState({
                cartCount:dd,
                Final:false
            })
            
        }
        var Purchase=()=>{
            
            if(data==null){ 
                window.location="./Login/?status=Login To pureee"
            }else{
                var PurchaseArr=[]
                for(var _E in this.props.Cart){
                    var {id}=this.props.Cart[_E]
                    var _count=this.state.cartCount[id]
                    var Data=[Number(id),_count]

                    PurchaseArr.push(Data)
                }
            
                Post('/_Purchase', { Data: PurchaseArr,id:sessionID })
                    .then(data => {
                        console.log(data); 
                        this.setState({
                            Final:true
                        })
                    });

                }
            
        }
        var GrandTotal=()=>{
            var Grand=0;
            for(var _E in this.props.Cart){
                    var {price,id}=this.props.Cart[_E]
                    var _ECount=this.state.cartCount[id]

                    Grand+=isNaN(price*_ECount)?0:price*_ECount;
            }
            return Math.round(Grand)
        }
        var CheckIsNan=(Num)=>{
            if(isNaN(Num)){
                return 0;
            }else{
                return Math.round(Num)
            }
           
        }
        var Final=()=>{
            return(
                <div className="_Final">
                    <Result
                        status="success"
                        title="Successfully Purchased Cloud Server ECS!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        extra={[
                        <Button type="primary" key="console">
                            Go Console
                        </Button>,
                        <Button key="buy">Buy Again</Button>,
                        ]}
                    />
                </div>
            )
        }
        return (
            <div>
                <div className="orderBack">
                {this.state.Final&&<Final/>}
                    <div className="orderArea">
                        <h1>Order Your ...</h1>
                        <div className="_cont">
                            <div className="Item_review">
                                <div className="itemName">
                                    <b>Name</b>
                                    <div>
                                        {this.props.Cart.map(e=><div>{e.title}</div>)}
                                    </div>
                                </div>
                                <div className="count">
                                    <b>Count</b>
                                    <div>
                                        {this.props.Cart.map(e=><InputNumber  onChange={(th)=>{ChangeVal(th,e)}} value={Number(CheckIsNan(this.state.cartCount[e.id]))}/>)}
                                    </div>
                                </div>
                                <div className="price">
                                    <b>Price</b>
                                    <div>
                                    {this.props.Cart.map(e=><div>{e.price}</div>)}
                                    </div>
                                </div>
                                <div className="TotalPrice">
                                    <b>Total Price</b>
                                    <div>
                                    {this.props.Cart.map(e=><div>{
                                            CheckIsNan(Number(e.price)*Number(this.state.cartCount[e.id]))
                                            }</div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="bill">
                                <div>
                                    <div className="TotalAmount">
                                        {GrandTotal()}
                                    </div>
                                    <div className="action">
                                        <Button disabled={this.props.Cart.length==0} onClick={Purchase}>Order</Button>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
               
               
            </div>
        )
    }
}
