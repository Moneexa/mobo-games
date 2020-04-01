import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Home } from '../../../pages/home/home';
import { GamesList } from '../../../pages/games-list/games-list';
import Signup from '../../../pages/signup/signup';
import { Login } from '../../../pages/login/login';
import { ProtectedRoute } from '../protected-route/protected-route';
import { connect } from 'react-redux';
import './layout.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    NavLink
} from "react-router-dom";


function Layout({isAuthenticated}) {
    return (
        <div id="layout">
            <Router >
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        <img className="logo-img" src="../logo.png" alt="mobo-gamez" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/home">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/games-list">
                                Games List
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/signup">
                                Signup
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>


                </Navbar>
                <div className="routerOutlet d-flex flex-column">
                    <Switch>

                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <ProtectedRoute path="/games-list" redirect="/login" component={GamesList} canActivate={isAuthenticated} />
                        <ProtectedRoute path="/signup" redirect="/games-list" component={Signup} canActivate={!isAuthenticated} />
                        <ProtectedRoute path="/login" redirect="/games-list" component={Login} canActivate={!isAuthenticated} />
                        <Route exact path="/">
                            <Redirect to="/home" />

                        </Route>

                    </Switch>
                </div>
                <footer className="border py-3">
                    <p id="footer" className="m-0">
                        <span>© Copyright 2019 - MoboGamez.com - All Rights Reserved.</span>
                    </p>
                </footer>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        isAuthenticated: state.isAuthenticated
    };
}
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(this.addUser, dispatch);
// }
export default connect(mapStateToProps, undefined)(Layout);
