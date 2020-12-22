import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/styles.css';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import UsersAdministration from './UsersAdministrationComponent';
import ProductsAdministration from './ProductsAdministrationComponent';
import MunicipalitiesAdministration from './MunicipalitiesAdministrationComponent';




const AdministratorComponent = () => {

    const location = useLocation();

    return (
        <div className = 'row'>
            <ProSidebar className = 'col-1'>
                <Menu iconShape="square">
                    <MenuItem  icon={<i className="fa fa-user"></i>}>
                        Gestionar usuarios
                        <Link to="/administrador/usuarios" />
                    </MenuItem>
                    
                    <MenuItem icon={<i className="fa fa-shopping-cart"></i>}>
                    Gestionar productos
                        <Link to="/administrador/productos" />
                    </MenuItem>

                    <MenuItem icon={<i className="fa fa-shopping-cart"></i>}>
                    Gestionar municipios
                        <Link to="/administrador/municipios" />
                    </MenuItem>

                </Menu>
            </ProSidebar>
            <Switch location={location} className = 'col'>
                <Route path='/administrador/usuarios' component={() => <UsersAdministration />} />
                <Route path='/administrador/productos' component={() => <ProductsAdministration />} />
                <Route path='/administrador/municipios' component={() => <MunicipalitiesAdministration />} />
            </Switch>
        </div>
    );
};

AdministratorComponent.propTypes = {};

export default AdministratorComponent;