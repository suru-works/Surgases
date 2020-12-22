import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Products from './ProductsComponent';
import Contact from './ContactComponent';
import Sales from './SalesComponent';
import Administrator from './AdministratorComponent';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { user, userReset } from '../redux/ActionCreators';
const MainComponent = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(user());
    });
    
    const HomePage = () => {
        return (
            <Home />
        );
    }
    return (
        <div>
            <Header />
                    <Switch location={location}>
                        <Route path="/inicio" component={HomePage} />
                        <Route path="/productos" component={() => <Products />} />
                        <Route path='/contacto' component={() => <Contact />} />
                        <Route path='/ventas' component={() => <Sales />} />
                        <Route path='/administrador' component={() => <Administrator />} />
                        <Redirect to="/inicio"></Redirect>
                    </Switch>
            <Footer />
        </div>
    );
};

MainComponent.propTypes = {};

export default MainComponent;