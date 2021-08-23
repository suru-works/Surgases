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

    });

const UserModal = (props) => {
    const [username] = useState(props.user.username);
    const [email] = useState(props.user.email);
    const [admin] = useState(props.user.es_admin);
    const [empleado] = useState(props.user.empleado);
    const [cliente] = useState(props.user.cliente);

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
            username: username,
            email: values.email,
            cliente: values.cliente,
            empleado: values.empleado,
            es_admin: true
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
            email: email,
            cliente: cliente,
            empleado: empleado,
            es_admin: admin
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
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
                                        <Label htmlFor="email">Correo</Label>
                                        <Input type="email" id="correo" name="correo" value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.correo && errors.correo) ? (<Alert color="danger">{errors.correo}</Alert>) : null}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="empleado">Id empleado</Label>
                                        <Input type="empleado" id="empleado" name="empleado" value={values.empleado}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.empleado && errors.empleado) ? (<Alert color="danger">{errors.empleado}</Alert>) : null}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="cliente">Id cliente</Label>
                                        <Input type="cliente" id="cliente" name="cliente" value={values.cliente}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.cliente && errors.cliente) ? (<Alert color="danger">{errors.cliente}</Alert>) : null}

                                    </FormGroup>


                                    <div className="l-flex ml-auto " class="col-12" >
                                        <div class="col-12 col-sm-8">
                                            <Label check  >
                                                <Input type="checkbox" id="es_admin" name="es_admin" className="form-control" values={values.es_admin}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />{' '}
                                                Administrador
                                            </Label>
                                        </div>
                                    </div>

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

    if (props.user) {
        return (
            <UserModal user={props.user} isOpen={props.isOpen} toggle={props.toggle}></UserModal>
        );
    }
    return (
        <div></div>
    );


}

EditUserComponent.propTypes = {};

export default EditUserComponent;