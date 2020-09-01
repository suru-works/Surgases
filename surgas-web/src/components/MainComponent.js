import React from 'react';
import PropTypes from 'prop-types';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
const MainComponent = () => {
    const location = useLocation();
    const HomePage = () => {
        return (
            <Home />
        );
    }
    return (
        <div>
            <Header/>
            <Switch location={location}>
                    <Route path="/inicio" component={HomePage} />
                    <Redirect to="/inicio"></Redirect>
            </Switch>
            <Footer/>
        </div>
    );
};

MainComponent.propTypes = {};

export default MainComponent;