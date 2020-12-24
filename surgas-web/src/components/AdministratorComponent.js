import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/styles.css';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import UsersAdministration from './UsersAdministrationComponent';
import ProductsAdministration from './ProductsAdministrationComponent';
import MunicipalitiesAdministration from './MunicipalitiesAdministrationComponent';
import SystemParametersAdministration from './SystemParametersAdministrationComponent';
import { Loading } from './LoadingComponent'




const AdministratorComponent = () => {

    const location = useLocation();

    const error = useSelector(state => state.user.errMess);
    const result = useSelector(state => state.user.result);
    const loading = useSelector(state => state.user.isLoading);
    if (loading) {
        return (
            <Loading></Loading>
        );
    }
    else if (error) {
        return (
            <div>No estas autorizado para acceder a este contenido</div>
        );

    }
    else if (result) {
        if (result.data.admin == '1') {
            return (
                <div className='row'>
                    <ProSidebar className='col-1' popperArrow={true} toggled={true}>
                        <SidebarHeader>
                            <Loading></Loading>
                        </SidebarHeader>
                        <SidebarContent>
                            <Menu iconShape="circle">
                                <MenuItem icon={<i className="fa fa-user"></i>}>
                                    Gestionar usuarios
                            <Link to="/administrador/usuarios" />
                                </MenuItem>

                                <MenuItem icon={<i className="fa fa-shopping-cart"></i>}>
                                    Gestionar productos
                            <Link to="/administrador/productos" />
                                </MenuItem>

                                <MenuItem icon={<i className="fa fa-globe"></i>}>
                                    Gestionar municipios
                            <Link to="/administrador/municipios" />
                                </MenuItem>
                                <SubMenu title="Sistema" icon={<i className="fa fa-cogs"></i>}>
                                    <MenuItem title="Parametros" icon={<i className="fa fa-info"></i>}>
                                        Parametros
                                    <Link to="/administrador/parametros" />
                                    </MenuItem>
                                    <MenuItem title="Respaldos" icon={<i className="fa fa-info"></i>}>
                                        Respaldar sistema
                                </MenuItem>
                                </SubMenu>


                            </Menu>
                        </SidebarContent>
                        <SidebarFooter>
                            <Loading></Loading>
                        </SidebarFooter>

                    </ProSidebar>
                    <Switch location={location} className='col'>
                        <Route path='/administrador/usuarios' component={() => <UsersAdministration />} />
                        <Route path='/administrador/productos' component={() => <ProductsAdministration />} />
                        <Route path='/administrador/municipios' component={() => <MunicipalitiesAdministration />} />
                        <Route path='/administrador/parametros' component={() => <SystemParametersAdministration />} />
                    </Switch>
                </div >
            );
        }
        else {
            return (
                <div>No estas autorizado para acceder a este contenido</div>
            );
        }
    }
    else {
        return (
            <div>No estas autorizado para acceder a este contenido</div>
        );
    }
};

AdministratorComponent.propTypes = {};

export default AdministratorComponent;