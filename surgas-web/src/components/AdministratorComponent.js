import React , {useState}  from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Alert} from 'reactstrap';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/styles.css';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import UsersAdministration from './UsersAdministrationComponent';
import ProductsAdministration from './ProductsAdministrationComponent';
import MunicipalitiesAdministration from './MunicipalitiesAdministrationComponent';
import SystemParametersAdministration from './SystemParametersAdministrationComponent';
import SystemPrintersAdministration from './SystemPrintersAdministrationComponent';
import  SystemBackup  from './SystemBackupComponent'
import { Loading } from './LoadingComponent'

const RenderLoginComponent = (props) => {
    

    return (
        <div>

            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                    <ModalHeader toggle={props.toggle}>Modal de Soporte</ModalHeader>

                <ModalBody>
                

                    <p>Modal en progreso, no envía ni recibe props aparte de los básicos</p>

                    <br></br>

                    <div className="d-flex justify-content-center" >
                        <Button  style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary">No hacer nada</Button>
                        <Button  style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Realizar la nadación</Button>
                    </div>
                
                </ModalBody>
            </Modal>

        </div>
    );
}


const AdministratorComponent = () => {

    const location = useLocation();

    const error = useSelector(state => state.user.errMess);
    const result = useSelector(state => state.user.result);
    const loading = useSelector(state => state.user.isLoading);

    const [isSystemBackupModalOpen, setIsSystemBackupModalOpen] = useState(false);
    const [isSoporteModalOpen, setIsSoporteModalOpen] = useState(false);
    const [isBlueBarOpen, setIsBlueBarOpen] = useState(false);

    const toggleSystemBackupModal = () => {
        if (isSystemBackupModalOpen) {
            setIsSystemBackupModalOpen(false);
        } else {
            setIsSystemBackupModalOpen(true);
        }
    }

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
        if (result.data.administrador == '1') {
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
                                            <MenuItem title="Impresoras" icon={<i className="fa fa-print"></i>}>
                                                Impresoras
                                            <Link to="/administrador/impresoras" />
                                            </MenuItem>
                                            <MenuItem title="Respaldos" icon={<i className="fa fa-info"></i>} onClick={()=>toggleSystemBackupModal()}>
                                                Respaldar sistema
                                                <SystemBackup toggle = {toggleSystemBackupModal} isOpen={isSystemBackupModalOpen}/>
                                        </MenuItem>
                                        </SubMenu>

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
                                <Route path='/administrador/usuarios' component={() => <UsersAdministration />} />
                                <Route path='/administrador/productos' component={() => <ProductsAdministration />} />
                                <Route path='/administrador/municipios' component={() => <MunicipalitiesAdministration />} />
                                <Route path='/administrador/parametros' component={() => <SystemParametersAdministration />} />
                                <Route path='/administrador/impresoras' component={() => <SystemPrintersAdministration />} />
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

AdministratorComponent.propTypes = {};

export default AdministratorComponent;