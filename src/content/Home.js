import React from "react"              
import { Carousel } from 'antd'; 

import {Get} from "./funcs"
import "./Home.less"

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            Slide:[]
        }
        this._ECarousel=this._ECarousel.bind(this)
    }
    componentWillMount() {
        Get("/api.homePage",(data)=>{
            this.setState({
                Slide:data.slides
            })
            console.log(this.state)
        })
    }
    _ECarousel(){
        return(
            <Carousel autoplay>
                {this.state.Slide.map((i,e)=>{return(<div key={e}><img src={i}/></div>)})}
            </Carousel>
        )
    }
    render(){
        return(
            <>
                <div className="Carousel">
                    <this._ECarousel></this._ECarousel>
                </div>
            </>
        )
    }
    
}

exports.Home=Home