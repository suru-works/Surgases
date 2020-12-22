import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';

import SessionExpiredComponent from './SessionExpiredComponent';
import { Loading } from './LoadingComponent';
import { logout, logoutReset } from '../redux/ActionCreators';
import { user, userReset } from '../redux/ActionCreators';

const LogOutComponent = (props) => {
    const error = useSelector(state => state.logout.errMess);
    const result = useSelector(state => state.logout.result);
    const loading = useSelector(state => state.logout.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(userReset());
        dispatch(user());
        dispatch(logoutReset());
        props.toggle();
    }

    const doLogout = () => dispatch(logout());

    const handleLogout = event => {
        event.preventDefault();
        doLogout();
    }

    if (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return (
                    <SessionExpiredComponent isOpen={props.isOpen} toggle={toogleAndReset} />
                );
            }
        }

        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error cerrando sesion.</p>
                    </ModalBody>
                </Modal>
            );
        }

    }
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                <ModalBody>
                    <p>Cierre de sesion exitoso</p>
                </ModalBody>
            </Modal>
        );

    }
    else {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Salir</ModalHeader>

                <ModalBody>
                    <p>¿Está seguro de que quiere cerrar sesión?</p>
                    <div className="d-flex justify-content-center">
                        <Button onClick={handleLogout} className="primary-button">Cerrar sesion</Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
};

LogOutComponent.propTypes = {};

export default LogOutComponent;