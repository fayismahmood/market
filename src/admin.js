import reactDom from "react-dom"
import React, { Component } from 'react'


import Header from "./admin/header";
import Purchases from "./admin/Purchases"
import Products from "./admin/Products"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./admin.less"


export default class Admin extends Component {
  render() {
    return (
      <div>
        <Router>
        <Header/>
        <div className="Contents">     
          <Switch>
            <Route exact path="/admin/">
              <div>Hi Assa</div>
            </Route>
            <Route path="/admin/Purchases/">
              <Purchases/>
            </Route>
            <Route path="/admin/Products/">
              <Products/>
            </Route>
          </Switch>

        </div>
        </Router>
      </div>      
    )
  }
}




reactDom.render(<Admin/>,document.querySelector("#cont"))