import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import New from "./New";
import VMs from "./VMs";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <h1>piVDI</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/vms">VMs</NavLink></li>
                    <li><NavLink to="/new">Create VM</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/vms" component={VMs}/>
                    <Route path="/new" component={New}/>
                </div>
            </HashRouter>
        )
    }
}

export default Main;