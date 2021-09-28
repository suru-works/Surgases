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

    const toggleAndReset = () => {
        dispatch(systemBackupReset());
        props.toggle();
    }

    const doSystemBackup = () => dispatch(systemBackup());

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toggleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Sistema respaldado correctamente.</p>
                </ModalBody>
                <Button onClick={toggleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toggleAndReset}>Respaldar el sistema</ModalHeader>

                <ModalBody>

                    
                        <p>¿Esta seguro que desea respaldar los datos del sistema?</p>
                        <p>Una vez respaldados los datos, se subirá una copia con la fecha actual a Google drive.</p>
                        
                     
                        <br></br>

                        <div className="d-flex justify-content-center" >
                            <Button className="primary-button" onClick={()=> doSystemBackup()} style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary">Respaldar</Button>
                            <Button className="secondary-button" onClick={props.toggle}  style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Cancelar</Button>
                        </div>

                </ModalBody>
            </Modal>


        );
    }
}

SystemBackup.propTypes = {};

export default SystemBackup ;