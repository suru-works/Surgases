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
            <div/>
        );
    }
    if (error) {
        if (error.response && error.response.status == 401) {
            return (
                <div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline style={{ margin: 10, borderColor: '#fdd835', color: '#fdd835' }} onClick={toggleLoginModal}>
                                <span className="fa fa-sign-in"></span> Iniciar sesión
                            </Button>
                        </NavItem>

                        <NavItem>
                            <Button variant="contained" style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" onClick={toggleRegisterModal}>
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

const UserOptionsSales = () => {
    const result = useSelector(state => state.user.result);
    if (result) {
        if (result.data.admin == '1' || result.data.comun == '1') {
            return (
                <NavItem >
                    <NavLink className='nav-link' to='/ventas'><span className='fa fa-list fa-lg'></span> Ventas</NavLink>
                </NavItem>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    else {
        return (
            <div></div>
        );
    }

}

const UserOptionsAdmin = () => {
    const result = useSelector(state => state.user.result);
    if (result) {
        if (result.data.admin == '1') {
            return (
                <NavItem >
                    <NavLink className='nav-link' to='/administrador'><span className='fa fa-list fa-lg'></span> Administracion</NavLink>
                </NavItem>
            );
        }
        else {
            return (
                <div />
            );
        }
    }
    else {
        return (
            <div></div>
        );
    }


}

const NavbarComponent = () => {
    const [navIsOpen, setNavIsOpen] = useState(true);

    const toggleNav = () => {
        setNavIsOpen(!navIsOpen);
    }

    return (
        <Navbar class="navbar navbar-expand-md" dark expand='md'>
            <div className='container'>
                <div class="collapse navbar-collapse">



                    <div class="navbar-nav">

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

                                <NavItem>
                                        <UserOptionsSales />
                                    </NavItem>
                                    <NavItem>
                                        <UserOptionsAdmin />
                                    </NavItem>


                            </Nav>

                        </Collapse>

                    </div>


                    <div class="ml-auto navbar-nav">



                        <Collapse isOpen={navIsOpen} navbar>

                            <AuthOptions />
                        </Collapse>

                        </div>


                </div>
            </div>
        </Navbar>
    );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;