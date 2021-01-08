import React , {useState}  from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import OrdersAdministration from './OrdersAdministrationComponent';
import ClientsAdministration from './ClientsAdministrationComponent';
import ProductsSearch from './ProductsSearchComponent';
import { Loading } from './LoadingComponent';


const RenderLoginComponent = (props) => {
    
//TO DO: Por ahora esto es una constante mal pegada en la clase, cuando lo vaya a implementar recuerde sacar el modal en su propio component
    return (
        <div>

            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                    <ModalHeader toggle={props.toggle}>Implementando modal de Soporte</ModalHeader>

                <ModalBody>
                

                    <p>Modal en progreso, próximamente</p>  
                    <br></br>

                    <div className="d-flex justify-content-center" >
                        <Button  style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary">ok</Button>
                    </div>
                
                </ModalBody>
            </Modal>

        </div>
    );
}

const SalesComponent = () => {
    const location = useLocation();
    const error = useSelector(state => state.user.errMess);
    const result = useSelector(state => state.user.result);
    const loading = useSelector(state => state.user.isLoading);

    const [isSoporteModalOpen, setIsSoporteModalOpen] = useState(false);
    const [isBlueBarOpen, setIsBlueBarOpen] = useState(false);

    const toggleSoporteModal = () => {
        if (isSoporteModalOpen) {
            setIsSoporteModalOpen(false);
        } else {
            setIsSoporteModalOpen(true);
        }
    }

    const toggleBlueBar = () => {
        if (isBlueBarOpen) {
            setIsBlueBarOpen(false);
        } else {
            setIsBlueBarOpen(true);
        }
    }

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
        if (result.data.tipo === 'vendedor' || result.data.tipo === 'administrador') {
            return (

                <div class="container m-0 p-0">
                    <div  class="row row-content p-0 m-0" >

                        <div class="col-2 col-sm-1 col-lg-3 p-0">
                            <ProSidebar  collapsed={isBlueBarOpen} >
                                <SidebarHeader style={{ textAlign: 'right' }}>
                                    <Button className="jumbo-button-1" style={{ backgroundColor: '#fdd835', color: '#000000' }}  onClick={toggleBlueBar} >
                                        <i class="fa fa-list" aria-hidden="true"></i>
                                    </Button>
                                </SidebarHeader>
                                <SidebarContent>
                                    <Menu iconShape="circle">
                                        <MenuItem icon={<i className="fa fa-truck"></i>}>
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
                                </SidebarContent>
                                <SidebarFooter >

                                    <Menu iconShape="circle">
                                        <MenuItem icon={<i className="fa fa-wrench"></i>} onClick={()=>toggleSoporteModal()} >
                                                Soporte
                                                <RenderLoginComponent toggle = {toggleSoporteModal} isOpen={isSoporteModalOpen} />
                                        </MenuItem>
                                    </Menu>
                                    
                                </SidebarFooter>

                            </ProSidebar>
                        </div>

                        <div class="col-10 col-sm-11 col-lg p-0">

                            <Switch location={location} >
                                <Route path='/ventas/pedidos' component={() => <OrdersAdministration />} />
                                <Route path='/ventas/clientes' component={() => <ClientsAdministration />} />
                                <Route path='/ventas/productos' component={() => <ProductsSearch />} />
                            </Switch>
                        </div>

                    </div >
                </div>

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

SalesComponent.propTypes = {};

export default SalesComponent;