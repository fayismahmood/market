import React, { Component } from 'react'
import 'regenerator-runtime/runtime'
import {Post} from "../content/funcs"
export class Purchases extends Component {
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        Post('/api.purchases/', { answer: 42 })
        .then(data => {
            this.setState({
                data:data.data
            })
        console.log(this.state.data); // JSON data parsed by `data.json()` call
        });
    }
    render() {
        var Purs=()=>{
            if(this.state.data.length==0){
                return(
                    <div>dfasdfsfdfds</div>
                )
            }else{
                return this.state.data.map((e)=>{
                        return (
                        <div>
                            <div>{e.cons}</div>
                            <div>{e.prod}</div>
                            <div>{e.status}</div>
                        </div>)
                        })
                       
                
            }
        }
        return (
            <div>
                {Purs()}
            </div>
        )
    }
}

export default Purchases
