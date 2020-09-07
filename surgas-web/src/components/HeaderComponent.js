import React, { useState } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';

const HeaderComponent = () => {
    const [navIsOpen, setNavIsOpen] = useState(true);

    const toggleNav = () => {
        setNavIsOpen(!navIsOpen);
    }

    return (
        <div>
            <NavbarComponent />
        </div>
    );
};

HeaderComponent.propTypes = {};

export default HeaderComponent;