import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { clients, addClient, clientsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        telefono: yup
            .string()
            .required("El cliente debe tener teléfono"),
        
        email: yup
            .string()
            .email()
            .required("El cliente debe tener correo"),
        
        nombre: yup
            .string()
            .required("El cliente debe tener nombre"),
        
        tipo: yup
            .string()
            .required("El cliente debe tener tipo")
    }
);

const AddClientComponent = (props) => {
    const error = useSelector(state => state.clientsUpdate.errMess);
    const result = useSelector(state => state.clientsUpdate.result);
    const loading = useSelector(state => state.clientsUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(clients());
        dispatch(clientsUpdateReset());
        props.toggle();
    }

    const doAddClient = (clientData) => dispatch(addClient(clientData));

    const uploadChanges = (values) => {

        const hoy = new Date();
        const mes = hoy.getMonth() + 1;

        const clientData = {

            telefono: values.telefono,
            email: values.email,
            nombre: values.nombre,
            fecha_registro: hoy.getFullYear() + '-' + ((mes > 9 ? '' : '0') + mes) + '-' + hoy.getDate(),
            tipo: values.tipo

        }

        doAddClient(clientData);
    }
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: '',
            email: '',
            nombre: '',
            tipo: ''
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
            resetForm();
        }
    });


    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un cliente</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Añadir un cliente</ModalHeader>
                <ModalBody>
                    <p>Hubo un error</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un cliente</ModalHeader>
                <ModalBody>
                    <p>Cliente añadido correctamente</p>
                </ModalBody>
                <div className="d-flex justify-content-center" >
                    <Button onClick={toogleAndReset} style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} >Aceptar</Button>
                </div>

            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Añadir un cliente</ModalHeader>

                <ModalBody>

                    <Form onSubmit={handleSubmit} >

                        <CardTitle> Ingresa los datos del cliente</CardTitle>

                        <hr />

                        <div className='row'>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="telefono">Tel&eacute;fono</Label>
                                <Input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    type="nombre"
                                    id="nombre"
                                    name="nombre"
                                    value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input
                                    type="tipo"
                                    id="tipo"
                                    name="tipo"
                                    value={values.tipo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <br></br>
                                <div class="d-flex justify-content-center"  >
                                    <Button style={{ backgroundColor: '#fdd835', color: '#000000' }}
                                        className="secondary-button" type="submit" value="submit">Añadir</Button>
                                </div>
                            </FormGroup>

                        </div>

                    </Form>

                </ModalBody>
            </Modal>

        );
    }

}
AddClientComponent.propTypes = {};

export default AddClientComponent;