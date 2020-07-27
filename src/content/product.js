import React, { Component } from 'react'
import {Get} from "./funcs"
export default class Product extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    componentDidMount(){
        Get(`/api.products/${this.props._id}`,(data)=>{
            this.setState({
                data:data
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.data.title}
            </div>
        )
    }
}
