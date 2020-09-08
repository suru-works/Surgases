import React from 'react';
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
const MainComponent = () => {
    const location = useLocation();
    const HomePage = () => {
        return (
            <Home />
        );
    }
    return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="page" timeout={500}>
                    <Switch location={location}>
                        <Route path="/inicio" component={HomePage} />
                        <Route path="/productos" component={() => <Products />} />
                        <Route path='/contacto' component={() => <Contact />} />
                        <Route path='/ventas' component={() => <Sales />} />
                        <Route path='/administrador' component={() => <Administrator />} />
                        <Redirect to="/inicio"></Redirect>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </div>
    );
};

MainComponent.propTypes = {};

export default MainComponent;