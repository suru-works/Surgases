import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';

import { user, getAccountData, restoreReset, restorePassword } from '../redux/ActionCreators';

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




const EditAccountForm = (props) => {

    const [nombre] = useState(props.account.nombre);
    const [email] = useState(props.account.email);
    const [tipo] = useState(props.account.tipo);
    const [restorePasswordModal, setRestorePasswordModal] = useState(false);


    const dispatch = useDispatch();

    const restoreError = useSelector(state => state.restore.errMess);
    const restoreResult = useSelector(state => state.restore.result);
    const restoreLoading = useSelector(state => state.restore.isLoading);


    const error = useSelector(state => state.accountUpdate.errMess);
    const result = useSelector(state => state.accountUpdate.result);
    const loading = useSelector(state => state.accountUpdate.isLoading);


    const doUpdateAccount = (accountData) => dispatch(updateAccount(accountData));

    const updateAccount = (values) => {
        const accountData = {
            usuario: {

            }
        }
        doUpdateAccount(accountData);
    }

    const submitPasswordChange = () => {

        setRestorePasswordModal(true);
        dispatch(restorePassword(props.account.usuario.username));
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: nombre,
            email: email,
            tipo: tipo
        },
        validationSchema,
        onSubmit(values) {
            updateAccount(values);
        }
    });
    if (restorePasswordModal) {
        if (restoreError) {
            return (
                    <ModalBody>
                        <p>Hubo un error cambiando tu contraseña</p>
                    </ModalBody>
            );
        }
        if (restoreLoading) {
            return (
                    <ModalBody>
                        <Loading />
                    </ModalBody>
            );
        }
        if (restoreResult) {

            return (
                    <ModalBody>
                        <p>Solicitud exitosa, en unos instantes te llegara un correo con las instrucciones para el cambio.</p>
                    </ModalBody>
            );
        }

    }
    else {
        if (error) {
            return (
                    <ModalBody>
                        <p>Hubo un error cargando tus datos</p>
                    </ModalBody>
            );
        }
        if (loading) {
            return (
                    <ModalBody>
                        <Loading />
                    </ModalBody>
            );
        }
        if (result) {

            return (
                    <ModalBody>
                        <p>Actualizacion de datos exitosa</p>
                    </ModalBody>
            );



        }
        return (
            <div>
                <ModalBody>

                    <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >

                        <CardTitle> Ingresa los datos del usuario: {props.account.usuario.username}</CardTitle>

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

}

const EditAccountComponent = (props) => {
    const error = useSelector(state => state.account.errMess);
    const result = useSelector(state => state.account.result);
    const loading = useSelector(state => state.account.isLoading);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccountData());
    }, []);

    const toggleAndReset = () => {
        dispatch(user());
        dispatch(restoreReset());
        props.toggle();
    }

    const aux = () => {
        if (error) {
            return (
                <p>Hubo un error.</p>
            );
        }
        else if (result) {
            return (
                <EditAccountForm account={result.data}></EditAccountForm>
            );
        }
        return (
            <Loading></Loading>
        );
    }

    return (
        <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
            <ModalHeader toggle={toggleAndReset}>Gestionar cuenta</ModalHeader>
            <ModalBody>
                {aux()}
            </ModalBody>
        </Modal>
    );
}

EditAccountComponent.propTypes = {};

export default EditAccountComponent;