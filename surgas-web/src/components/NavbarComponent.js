import React, { useState } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavbarComponent = () => {
    const [navIsOpen, setNavIsOpen] = useState(true);

    const toggleNav = () => {
        setNavIsOpen(!navIsOpen);
    }

    return (
        <Navbar dark expand='md'>
            <div className='container'>
                <NavbarToggler onClick={toggleNav} />
                <NavbarBrand className='mr-auto' href='/'>
                    <img src={baseFrontUrl + "public/logo/transparent-logo-icon.png"} height='31.5' width='32' alt='small-company-logo' />
                </NavbarBrand>
                <Collapse isOpen={navIsOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='nav-link' to='/inicio'><span className='fa fa-home fa-lg'></span> Inicio</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/productos'><span className='fa fa-list fa-lg'></span> Productos</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/contacto'><span className='fa fa-address-card fa-lg'></span> Contáctanos</NavLink>
                        </NavItem>

                        {/* NOTA: LAS SIGUIENTES SOLO DEBEN APARECER DEPENDIENDO DEL USUARIO */}
                        <NavItem>
                            <NavLink className='nav-link' to='/ventas'><span className='fa fa-list fa-lg'></span> Ventas</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/administrador'><span className='fa fa-list fa-lg'></span> Administrador</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;