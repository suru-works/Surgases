import React, { useState } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import AcountManagement from './AcountManagementComponent';
import LogoutComponent from './LogoutComponent';
import { Loading } from './LoadingComponent';
import { useSelector } from 'react-redux';
import { __esModule } from 'reactstrap/lib/Row';


const AuthOptions = () => {
    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false);
    const [isAcountManagementModalOpened, setIsAcountManagementModalOpened] = useState(false);
    const [isRegisterModalOpened, setIsRegisterModalOpened] = useState(false);
    const [btnDroplistSesion, setDroplistSesionOpened] = useState(false);

    const toggleDroplistSesion = () => {
        if (btnDroplistSesion) {
            setDroplistSesionOpened(false)
        }
        else {
            setDroplistSesionOpened(true)
        }
    }

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

    const toggleAcountManagementModal = () => {
        if (isAcountManagementModalOpened) {
            setIsAcountManagementModalOpened(false)
        }
        else {
            setIsAcountManagementModalOpened(true)
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

                <ButtonDropdown direction="down"  isOpen={btnDroplistSesion} toggle={ toggleDroplistSesion }  >   
                    <DropdownToggle caret  style={{ margin: 10, borderColor: '#fdd835', color: '#fdd835' , backgroundColor: '#1a3b70'}}>
                        Sesión
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem style={{ color: '#001644'}} onClick={toggleLogoutModal} >Cerrar sesión</DropdownItem>
                            <LogoutComponent isOpen={isLogoutModalOpened} toggle={toggleLogoutModal} />
                        <DropdownItem style={{ color: '#001644'}} onClick={toggleAcountManagementModal} >Gestionar cuenta</DropdownItem>
                            <AcountManagement isOpen={isAcountManagementModalOpened} toggle={toggleAcountManagementModal} user={result.data } />
                    </DropdownMenu>
                    
                </ButtonDropdown>

            </div>

        );
    }
    return (<p>ERROR</p>);
}

const UserOptionsSales = () => {
    const result = useSelector(state => state.user.result);
    if (result) {
        if (result.data.es_admin.data[0] || result.data.empleado_tipo.includes('vendedor,')) {
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
        if (result.data.es_admin.data[0]) {
            return (
                <NavItem >
                    <NavLink className='nav-link' to='/administrador'><span className='fa fa-list fa-lg'></span> Administración</NavLink>
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

                <NavbarToggler onClick={toggleNav} />
                <NavbarBrand className='mr-auto' href='/'>
                    <img src={baseFrontUrl + "public/logo/S-14-cropped.png"} height='31.5' alt='small-company-logo' />
                </NavbarBrand>
                <Collapse isOpen={navIsOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className='nav-link' to='/inicio'><span className='fa fa-home fa-lg'></span> Inicio</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className='nav-link' to='/productos'><span className='fa fa-list fa-lg'></span> Productos</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className='nav-link' to='/contacto'><span className='fa fa-address-card fa-lg'></span> Contáctanos</NavLink>
                        </NavItem>

                        <NavItem className="d-flex align-items-center">
                            <UserOptionsSales />
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <UserOptionsAdmin />
                        </NavItem>


                    </Nav>

                    <Nav className="ml-auto" navbar >

                        <Collapse isOpen={navIsOpen} navbar>

                            <NavItem className="d-flex align-items-center">

                                <AuthOptions />
                            </NavItem>

                        </Collapse>
                        
                    </Nav>

                </Collapse>

            </div>

        </Navbar>
    );
};

NavbarComponent.propTypes = {};

export default NavbarComponent;