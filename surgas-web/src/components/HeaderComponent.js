import React, { useState } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';

const HeaderComponent = () => {
    
    return (
        <div>
            <NavbarComponent />
        </div>
    );
};

HeaderComponent.propTypes = {};

export default HeaderComponent;