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
                <div className="grid-container">
                    <header className="header">
                        <h1 className="header__title">piVDI Virtual Desktops</h1>
                    </header>
                    <aside className="sidenav">
                        <ul className="sidenav__list">
                            <NavLink to="/" className="sidenav__list-text"><li className="sidenav__list-item">Home</li></NavLink>
                            <NavLink to="/vms" className="sidenav__list-text"><li className="sidenav__list-item">VMs</li></NavLink>
                              
                        </ul>
                    </aside>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/vms" component={VMs}/>
                        <Route path="/new" component={New}/>
                    </div>
                </div>
                
            </HashRouter>
        )
    }
}

export default Main;