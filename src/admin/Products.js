import React, { Component } from 'react'
import {Post,Get} from '../content/funcs'
import {Edit,Delete} from "@material-ui/icons"
import {IconButton} from '@material-ui/core'

import './Products.less'

export default class Products extends Component {
    constructor(){
        super()
        this.state={
            data:{}
        }
    }
    componentWillMount(){
        Get("/api.products/",(data)=>{
            this.setState({
                data:data
            })
        })
    }
    render() {
        var Prod=()=>{
            if(this.state.data.products){
                return this.state.data.products.map((e)=>{
                    return(
                    <div className="_EProd">
                        <div className="_id">{e.id}</div>
                        <div className="_price">{e.price}</div>
                        <div className="_title">{e.title}</div>
                        <div className="_type">{e.type}</div>
                        <div>
                            <IconButton><Edit fontSize="small" /></IconButton>
                            <IconButton><Delete fontSize="small" /></IconButton>
                        </div>
                    </div>
                    
                   
                    )
                })
            }
            
        }
        return (
            <div>
                {Prod()}
            </div>
        )
    }
}
