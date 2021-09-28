import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { user, updateCurrentUser, userReset, users, userUpdateReset, restoreReset, restorePassword } from '../redux/ActionCreators';
import { useFormik } from "formik";

import * as yup from "yup";

const validationSchema = yup.object(
    //TO DO: hacer las validaciones
    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    });


const AcountManagement = (props) => {

    const [username] = useState(props.user.username);
    const [nombre] = useState(props.user.nombre);
    const [email] = useState(props.user.email);
    const [tipo] = useState(props.user.tipo);
    const [restorePasswordModal, setRestorePasswordModal] = useState(false);


    const dispatch = useDispatch();

    const restoreError = useSelector(state => state.restore.errMess);
    const restoreResult = useSelector(state => state.restore.result);
    const restoreLoading = useSelector(state => state.restore.isLoading);

    const error = useSelector(state => state.userUpdate.errMess);
    const result = useSelector(state => state.userUpdate.result);
    const loading = useSelector(state => state.userUpdate.isLoading);

    const toggleAndReset = () => {
        setRestorePasswordModal(true);
        dispatch(restoreReset());
        dispatch(userUpdateReset());
        dispatch(user());
        dispatch(users());
        dispatch(userUpdateReset());
        props.toggle();
    }

    const doUpdateUser = (userData) => dispatch(updateCurrentUser(userData));

    const uploadChanges = (values) => {
        const userData = {
            username: props.user.username,
            nombre: values.nombre,
            email: values.email,
            tipo: values.tipo
        }
        doUpdateUser(userData);
    }

    const submitPasswordChange = () => {

        setRestorePasswordModal(true);
        dispatch(restorePassword(username));
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

    const options = () => {
        if (restorePasswordModal) {
            if (restoreError) {
                return (
                    <div>
                        <ModalHeader toggle={toggleAndReset}>Cambiar contraseña</ModalHeader>
                        <ModalBody>
                            <p>Hubo un error camabiando tu contraseña</p>
                        </ModalBody>
                    </div>
                );
            }
            if (restoreLoading) {
                return (
                    <div>
                        <ModalHeader toggle={toggleAndReset}>Cambiar contraseña</ModalHeader>
                        <ModalBody>
                            <Loading />
                        </ModalBody>
                    </div>
                );
            }
            if (restoreResult) {

                return (
                    <div>

                        <ModalHeader toggle={toggleAndReset}>Cambiar contraseña</ModalHeader>
                        <ModalBody>
                            <p>Solicitud exitosa, en unos instantes te llegara un correo con las instrucciones para el cambio.</p>
                        </ModalBody>

                    </div >
                );
            }

        }
        else {
            if (error) {
                return (
                    <div>
                        <ModalHeader toggle={toggleAndReset}>Gestionar cuenta</ModalHeader>
                        <ModalBody>
                            <p>Hubo un error cargando tus datos</p>
                        </ModalBody>
                    </div>
                );
            }
            if (loading) {
                return (
                    <div>
                        <ModalHeader toggle={toggleAndReset}>Gestionar cuenta</ModalHeader>
                        <ModalBody>
                            <Loading />
                        </ModalBody>
                    </div>
                );
            }
            if (result) {

                return (
                    <div>

                        <ModalHeader toggle={toggleAndReset}>Gestionar cuenta</ModalHeader>
                        <ModalBody>
                            <p>Actualizacion de datos exitosa</p>
                        </ModalBody>

                    </div >
                );



            }
            return (
                <div>

                    <ModalHeader toggle={toggleAndReset}>Editar un usuario</ModalHeader>

                    <ModalBody>

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >

                            <CardTitle> Ingresa los datos del usuario: {username}</CardTitle>

                            <br></br>

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
                                <Label htmlFor="tipo">Tipo</Label>
                                <Input type="select" name="tipo" id="tipo" value={values.tipo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option>vendedor</option>
                                    <option>administrador</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="changePassword">contraseña</Label>
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000' }} onClick={submitPasswordChange} >Cambiar contraseña</Button>
                            </FormGroup>

                            <br></br>

                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000' }} type="submit" value="submit"  >Actualizar</Button>
                            </div>

                        </Form>

                    </ModalBody>

                </div>
            );
        }
    };
    return (
        <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
            {options()}
        </Modal>
    );
}
AcountManagement.propTypes = {};

export default AcountManagement;