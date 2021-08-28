import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Alert
} from 'reactstrap';

import { Loading } from './LoadingComponent';
import { login, loginReset, restoreReset, restorePassword } from '../redux/ActionCreators';
import { user, userReset } from '../redux/ActionCreators';
import { useFormik } from "formik";

import * as yup from "yup";



const validationSchema = yup.object(
    {
        username: yup
            .string()
            .required("Este campo es obligatorio"),
        password: yup
            .string()
            /*.min(8, "la contraseña debe ser de minimo 8 caracteres")*/
            .max(40, "la contraseña debe ser de maximo 40 caracteres")
            .required("Este campo es obligatorio"),
    });



const LoginComponent = (props) => {

    const [restore, setRestore] = useState(false);

    const dispatch = useDispatch();

    const error = useSelector(state => state.login.errMess);
    const result = useSelector(state => state.login.result);
    const loading = useSelector(state => state.login.isLoading);

    const restoreError = useSelector(state => state.restore.errMess);
    const restoreResult = useSelector(state => state.restore.result);
    const restoreLoading = useSelector(state => state.restore.isLoading);


    const toogleAndReset = () => {
        dispatch(userReset());
        dispatch(user());
        dispatch(restoreReset());
        dispatch(loginReset());
        setRestore(false);
        props.toggle();
    }

    const switchRestore = () => {
        if (restore) {
            setRestore(false);
        }
        else {
            setRestore(true);
        }
    }

    const doLogin = credentials => dispatch(login(credentials));

    const handleLogin = values => {

        doLogin({ username: values.username, password: values.password, remember: values.remember });
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: false
        },
        validationSchema,
        onSubmit(values) {
            handleLogin(values);
        }
    });

    const submitPasswordChange = (username) => {
        if (username) {
            switchRestore();
            dispatch(restorePassword(username));
        }

    }

    if (restore) {
        if (restoreError) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error Restableciendo contraseña</p>
                    </ModalBody>
                </Modal>
            );
        }
        else if (restoreLoading) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </Modal>
            );
        }
        else if (restoreResult) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                    <ModalBody>
                        <p>Si tu usuario es correcto y esta registrado con un correo valido, en breve recibiras las instrucciones para restablecer tu contraseña</p>
                    </ModalBody>
                </Modal>
            );


        }

    }
    else {

        if (error) {
            if(error.message === 'Request failed with status code 403'){
                return (
                    <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                        <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                        <ModalBody>
                            <p>Tu correo aun no ha sido verificado, revisa tu bandeja de entrada y sigue las instrucciones.</p>
                        </ModalBody>
                    </Modal>
                );
            }
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error ingresando</p>
                    </ModalBody>
                </Modal>
            );
        }
        if (loading) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
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
                        <p>Ingreso exitoso</p>
                    </ModalBody>

                </Modal>
            );



        }
        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="username">Usuario</Label>
                                <Input type="username" id="username" name="username" className="form-control" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.username && errors.username) ? (<Alert color="danger">{errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña</Label>
                                <Input type="password" id="password" className="form-control" name="password" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.password && errors.password) ? (<Alert color="danger">{errors.password}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>

                                <div className="l-flex ml-auto " class="col-12" >
                                    <div class="col-12 col-sm-8">
                                        <Label check  >
                                            <Input type="checkbox" id="remember" name="remember" className="form-control" values={values}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />{' '}
                                    Recuérdame
                                </Label>
                                    </div>
                                </div>
                            </FormGroup>

                            <br></br>

                            <div className="d-flex justify-content-center" >
                                <Button type="submit" value="submit" style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Ingresar</Button>
                                <Button onClick={() => submitPasswordChange(values.username)} style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000'}} color="primary">Olvidé mi contraseña</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }


    }
}

LoginComponent.propTypes = {};

export default LoginComponent;