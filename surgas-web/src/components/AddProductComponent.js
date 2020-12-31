import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { users, addUser, usersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);

const AddUserComponent = (props) => {
 //TO DO
/*  Las inserciones de nuevos usuarios no estan funcionando... posiblemente por el json que se esta mandando en la solicitud */
    const error = useSelector(state => state.usersUpdate.errMess);
    const result = useSelector(state => state.usersUpdate.result);
    const loading = useSelector(state => state.usersUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(users());
        dispatch(usersUpdateReset());
        props.toggle();
    }

    const doAddUser = (userData) => dispatch(addUser(userData));

    const uploadChanges = (values) => {
        const userData = {
            username: values.username,
            nombre: values.nombre,
            password: values.pasword,
            email: values.email,
            administrador: values.administrador,
            vendedor: values.vendedor
        }
        doAddUser(userData);        
    }
    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            codigo: '',
            nombre: '',
            color: '',

            pesoMinimo: '',
            pesoMaximo: '',
            tipo:  '',

            precioMinimo: '',
            precioMaximo: '',

            inventarioMinimo: '',
            inventarioMaximo: '',
            disponible: ''
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });


    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un usuario</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Añadir un usuario</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un usuario</ModalHeader>
                <ModalBody>
                    <p>Usuario añadido correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            
            <Modal isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Añadir un usuario</ModalHeader>

                <ModalBody>

                        <Form onSubmit={handleSubmit} >

                            <CardTitle> Ingresa los datos del usuario</CardTitle>
                            <br></br>

                            <FormGroup>
                                
                                <Label htmlFor="username">Usuario</Label>
                                <Input type="text" id="username" name="username" value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.username && errors.username) ? (<Alert color="danger">{errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>

                                <Label htmlFor="nombre">Nombre</Label>
                                <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                            </FormGroup>
                            
                            <br></br>

                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} type="submit" value="submit"  >Actualizar</Button>
                            </div>

                        </Form>

                </ModalBody>
            </Modal>

        );
    }

}
AddUserComponent.propTypes = {};

export default AddUserComponent;