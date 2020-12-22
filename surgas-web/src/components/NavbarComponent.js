import React, { useState } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, Button } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import { Loading } from './LoadingComponent';
import { useSelector } from 'react-redux';
import { __esModule } from 'reactstrap/lib/Row';


const AuthOptions = () => {
    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false);
    const [isRegisterModalOpened, setIsRegisterModalOpened] = useState(false);

    const toggleLoginModal = () => {
        if (isLoginModalOpened) {
            setIsLoginModalOpened(false)
        }
        else {
            setIsLoginModalOpened(true)
        }
    }

    const toggleLogoutModal = () => {
        if (isLogoutModalOpened) {
            setIsLogoutModalOpened(false)
        }
        else {
            setIsLogoutModalOpened(true)
        }
    }

    const toggleRegisterModal = () => {
        if (isRegisterModalOpened) {
            setIsRegisterModalOpened(false)
        }
        else {
            setIsRegisterModalOpened(true)
        }
    }

    const error = useSelector(state => state.user.errMess);
    const result = useSelector(state => state.user.result);
    const loading = useSelector(state => state.user.isLoading);

    if (loading) {
        return (
            <Loading />
        );
    }
    if (error) {
        if (error.response && error.response.status == 401) {
            return (
                <div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline style={{ margin: 10, borderColor: '#f9683a', color: '#f9683a' }} onClick={toggleLoginModal}>
                                <span className="fa fa-sign-in"></span> Iniciar sesión
                            </Button>
                        </NavItem>

                        <NavItem>
                            <Button variant="contained" style={{ margin: 10, backgroundColor: '#f9683a', color: '#ffffff' }} color="secondary" onClick={toggleRegisterModal}>
                                <span className="fa fa-user-circle-o" aria-hidden="true"></span>  Regístrate
                            </Button>
                        </NavItem>
                    </Nav>
                    <RegisterComponent isOpen={isRegisterModalOpened} toggle={toggleRegisterModal} />
                    <LoginComponent isOpen={isLoginModalOpened} toggle={toggleLoginModal} />
                </div>
            );
        } else {
            return (
               <div>
                   Hubo un error
               </div>
            
            );
        }
    }
    if (result) {
        return (
            <div>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline style={{ margin: 10, borderColor: '#f9683a', color: '#f9683a' }} onClick={toggleLogoutModal}>
                            <span className="fa fa-sign-in"></span> Cerrar sesión
                    </Button>
                    </NavItem>
                </Nav>
                <LogoutComponent isOpen={isLogoutModalOpened} toggle={toggleLogoutModal} />
            </div>
        );
    }
    return (<p>ERROR</p>);
}

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
                    <AuthOptions />
                </Collapse>
            </div>
        </Navbar>
    );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;