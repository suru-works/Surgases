import React from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import OrdersAdministration from './OrdersAdministrationComponent';
import ClientsAdministration from './ClientsAdministrationComponent';
import ProductsSearch from './ProductsSearchComponent';

const SalesComponent = () => {
    const location = useLocation();

    return (
        <div className="row">
            <ProSidebar className="col-1">
                <Menu iconShape="circle">
                    <MenuItem  icon={<i className="fa fa-truck"></i>}>
                        Gestionar pedidos
                        <Link to="/ventas/pedidos" />
                    </MenuItem>
                    
                    <MenuItem icon={<i className="fa fa-users"></i>}>
                    Gestionar clientes
                        <Link to="/ventas/clientes" />
                    </MenuItem>

                    <MenuItem icon={<i className="fa fa-shopping-cart"></i>}>
                    Consultar productos
                        <Link to="/ventas/productos" />
                    </MenuItem>

                </Menu>
            </ProSidebar>

            <Switch location={location} className = 'col'>
                <Route path='/ventas/pedidos' component={() => <OrdersAdministration />} />
                <Route path='/ventas/clientes' component={() => <ClientsAdministration />} />
                <Route path='/ventas/productos' component={() => <ProductsSearch />} />
            </Switch>
        </div>
    );
};

SalesComponent.propTypes = {};

export default SalesComponent;