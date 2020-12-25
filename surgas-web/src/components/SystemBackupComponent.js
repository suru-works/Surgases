import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';

import { systemBackup, systemBackupReset } from '../redux/ActionCreators';

const SystemBackup = (props) => {

    const error = useSelector(state => state.systemBackup.errMess);
    const result = useSelector(state => state.systemBackup.result);
    const loading = useSelector(state => state.systemBackup.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(systemBackupReset());
        props.toggle();
    }

    const doSystemBackup = () => dispatch(systemBackup());

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Sistema respaldado correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <div class="d-flex justify-content-center" >
                            <Label>Esta seguro que desea respaldar los datos del sistema?</Label>
                            <Label>Una vez respaldados los datos, se subira una copia con la fecha actual a google drive.</Label>
                            <Button className="primary-button" onClick={()=> doSystemBackup()} >Respaldar</Button>
                            <Button className="secondary-button" onClick={props.toggle} >Cancelar</Button>
                        </div>

                    </div>

                </ModalBody>
            </Modal>


        );
    }
}

SystemBackup.propTypes = {};

export default SystemBackup ;