import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const SalesComponent = () => {
    return (
        <div>
            <ProSidebar>
                 <Menu iconShape="square">
                    <MenuItem icon={<i className="fa fa-gem"></i>}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<i className="fa fa-heart"></i>}>
                        <MenuItem>
                            Component 1
                            <Link to="/" />
                        </MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </div>
    );
};

SalesComponent.propTypes = {};

export default SalesComponent;