import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { users, updateUser, deleteUser, usersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    //TO DO: hacer las validaciones del correo, si es que se puede editar, no se
    {
        nombre: yup
            .string()
            .required("El usuario debe tener un nombre")
            .min(3, "El nombre debe ser de mínimo 3 caracteres")
            .max(30, "El nombre debe ser de máximo 30 caracteres"),

    });

const UserModal = (props) => {
    const [username] = useState(props.user.username);
    const [nombre] = useState(props.user.nombre);
    const [email] = useState(props.user.email);
    const [tipo] = useState(props.user.tipo);

    const error = useSelector(state => state.usersUpdate.errMess);
    const result = useSelector(state => state.usersUpdate.result);
    const loading = useSelector(state => state.usersUpdate.isLoading);



    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(users());
        dispatch(usersUpdateReset());
        props.toggle();
    }

    const doUpdateUser = (userData) => dispatch(updateUser(userData));

    const uploadChanges = (values) => {
        const userData = {
            username: props.user.username,
            nombre: values.nombre,
            email: values.email,
            tipo: values.tipo
        }
        doUpdateUser(userData);
    }

    const doDeleteUser = (userData) => dispatch(deleteUser(userData));

    const deleteThatUser = () => {
        const userData = {
            username: props.user.username
        }
        doDeleteUser(userData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: nombre,
            email: email,
            tipo: tipo
        },
        validationSchema,
        onSubmit(values) {
            const userData = {
                nombre: values.nombre,
                email: values.email,
                tipo: values.tipo
            }
            uploadChanges(userData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <p>Usuario Editado correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={props.toggle}>Editar un usuario</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos del usuario: {username}</CardTitle>
                                <CardBody style={{ padding: 8 }}>

                                    <FormGroup>
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="email">Correo</Label>
                                        <Input type="email" id="correo" name="correo" value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.correo && errors.correo) ? (<Alert color="danger">{errors.correo}</Alert>) : null}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="tipo">Tipo</Label>
                                        <Input type="select" name="tipo" id="tipo" value={values.tipo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                            <option>vendedor</option>
                                            <option>administrador</option>
                                        </Input>
                                    </FormGroup>

                                    <div class="d-flex justify-content-center" >
                                        <FormGroup>

                                            <div className="d-flex justify-content-center" >

                                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type="submit" value="submit"  >Actualizar</Button>
                                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary" onClick={() => deleteThatUser()}  >Eliminar Usuario</Button>
                                            </div>
                                        </FormGroup>

                                    </div>

                                </CardBody>

                            </Card>

                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }

}

const EditUserComponent = (props) => {

    if(props.user){
        return(
            <UserModal user={props.user} isOpen={props.isOpen} toggle={props.toggle}></UserModal>
        );
    }
    return(
        <div></div>
    );
    

}

EditUserComponent.propTypes = {};

export default EditUserComponent;