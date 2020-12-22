import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const UsersAdministration = () => {
    return (
        <div>
            Puto el que lo lea
        </div>
    );
}

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

                </Menu>
            </ProSidebar>
            <Switch location={location} className = 'col'>
                <Route path='/administrador/usuarios' component={() => <UsersAdministration />} />
            </Switch>
        </div>
    );
};

AdministratorComponent.propTypes = {};

export default AdministratorComponent;