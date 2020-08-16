import React,{useState} from "react"              
import { Rate,Carousel,Button,Popover, Divider,Comment, Input } from 'antd'; 
import {ShoppingFilled,SendOutlined} from "@ant-design/icons"
import {Get} from "./funcs"



import {App} from "../index"

import  './Store.less'
import Product from "./product"

class Store extends React.Component{
    constructor(props){
        super(props)
        this.state={
            products:[],
            types:[],
            Popover:0,
            cart:this.props.cart
        }

        this._EProd=this._EProd.bind(this)
    }
    componentWillMount(){
        Get("/api.products/",(data)=>{
            
            this.setState({
                products:data.products,
                types:data.types
            },()=>{
                console.log(this.state.products)
            })
        })

        
    }
     _getFullType(i,e){
        var {types,products}=this.state;
        var Produc=(_id)=>{
            this.setState({Popover:_id},()=>{
                
            })
        }
        return(
            <div  key={e}>
                            <h2>
                                {i}
                            </h2>
                            <div className="prodtype">
                               {products.filter(word => word.type==i).map((prod)=>{
                                   return(<div onClick={(e)=>{Produc(prod.id)}} className="_Eprod">
                                            <img className="prodImage" src={"./img/1 ("+prod.filename+").png"}/>
                                            <div className="content">
                                                <div className="prodTitle">
                                                    {prod.title}
                                                </div>
                                                <div className="prodPrice">
                                                    {prod.price}
                                                </div>
                                                <div className="prodRate">
                                                    <Rate allowHalf defaultValue={prod.rating}></Rate>
                                                </div>
                                                
                                            </div>
                                        </div>)
                               })}
                            </div>
                           {this.state.Popover}
                        </div>
        )
    }
    _EProd(){
        var {types,products}=this.state;
        
        return(
            <div>
                {types.map((i,e)=>{
                    return(
                        <div key={e}>
                            <_getFullType i={i} e={e} cart={this.props.cart} AddtoCart={this.props.AddtoCart} state={this.state}></_getFullType>
                        </div> 
                    )
                })}
            </div>
        )
        
    }
    render(){
        return(
            <div style={{boxSizing:"border-box",padding:"20px"}}>
                <this._EProd></this._EProd>
            </div>
        )
    }
}


 class _getFullType extends React.Component {
    constructor(props){
        super(props)
        this.state={
            cart:this.props.cart
        }
    }
    render() {
        var {types,products}=this.props.state;
        var {i,e}=this.props
        return (
            <div key={e}>
                            <h2>
                                {i}
                            </h2>
                            <div className="prodtype">
                               {products.filter(word => word.type==i).map((prod,i)=>{
                                  
                                   return(
                                       <div key={i}>
                                            <_EProd cart={this.props.cart} AddtoCart={this.props.AddtoCart} prod={prod}/>
                                       </div>
                                       
                                   )
                               })}
                            </div>
                        </div>
        )
    }
}



class _EProd extends React.Component {
    constructor(props){
        super(props)
        this.state={
            ProdDet:false,
            cart:this.props.cart
        }
    }
    render() {
        var {prod}=this.props
        var OpenDet=()=>{
            this.setState({
                ProdDet:true
            })
        }
        var CloseDet=()=>{
            this.setState({
                ProdDet:false
            })
            
        }
        return (
            <div onClick={OpenDet} className="_Eprod">
                <img className="prodImage" src={"./img/1 ("+prod.filename+").png"}/>
                <div className="content">
                    <div className="prodTitle">
                        {prod.title}
                    </div>
                    <div className="prodPrice">
                        {prod.price}
                    </div>
                    <div className="prodRate">
                        <Rate allowHalf defaultValue={prod.rating}></Rate>
                    </div>
                </div>
                {this.state.ProdDet&&<ProdDet cart={this.props.cart} AddtoCart={this.props.AddtoCart} close={CloseDet} _id={prod.id}/>}   
            </div>

        )
    }
}


class ProdDet extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:{},
            cart:this.props.cart
        }
    }
    componentDidMount(){

        Get(`/api.products/${this.props._id}`,(data)=>{
            this.setState({
                data:data
            })
        },()=>{
            console.log(this.state);
        })

        
    }
    componentWillUnmount(){
        document.body.style.overflow="auto"

    }
    render(){
        document.body.style.overflow="hidden"
        var Close=(e)=>{ 
            this.props.close()
            e.stopPropagation()
        }
        var {title,id,type,description,price,rating}=this.state.data
        var AddToCart=(id)=>{
            Post('/_addToCart', { item: id })
                .then((data) => {
                    
                    this.props.AddtoCart(id)
                    //console.log(data); // JSON data parsed by `data.json()` call
                });
        }
        var a=()=>{
            console.log(this.props.cart.filter(e=>e.id==0).length!==0,"eeewww")
        }
    
        return(
            <div onClick={Close} className="ModelBack">
               <div onClick={(e)=>{e.stopPropagation()}} className="Model">
                    <div className="_head_imgs">
                        <Carousel>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                        </Carousel>
                    </div>
                    <div className="Det_body">
                        <h1 className="_prodName">
                            {title}
                        </h1>
                        <div>
                            {description}
                        </div>
                        <div className="_price">
                            {price}
                        </div>
                        <div>
                            <Rate allowHalf defaultValue={rating}></Rate>
                        </div>
                        <Divider></Divider>
                        <div className="_comments">
                            <h3>Comments</h3>
                            <div>
                                <Comment>
                                    aasfasdfasfaf
                                </Comment>
                                <Comment>
                                    aasfasdfasfaf
                                </Comment>
                                <Comment>
                                    aasfasdfasfaf
                                </Comment>
                                <div className="commenter">
                                    <Input placeholder="please Comment"></Input>
                                    <Button type="primary" icon={<SendOutlined></SendOutlined>}>Comment</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="action">
                        {id}
                        {a()}
                        <Button disabled={this.props.cart.filter(e=>e.id==id).length!==0} onClick={()=>{AddToCart(id)}} icon={<ShoppingFilled/>}>Add to Cart</Button>
                        <Button disabled={this.props.cart.includes(id)} type="primary" icon={<ShoppingFilled/>}>Buy</Button>
                    </div>
               </div>
            </div>
        )
    }
}



exports.Store=Store