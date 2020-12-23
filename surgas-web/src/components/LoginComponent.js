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


const RenderLoginComponent = (props) => {
    const dispatch = useDispatch();
    const validationSchema = yup.object(
        {
            user: yup
                .string()
                .required("Este campo es obligatorio"),
            password: yup
                .string()
                /*.min(8, "la contraseña debe ser de minimo 8 caracteres")*/
                .max(40, "la contraseña debe ser de maximo 40 caracteres")
                .required("Este campo es obligatorio"),
        });


    const doLogin = credentials => dispatch(login(credentials));

    const handleLogin = values => {

        doLogin({ username: values.user, password: values.password, remember: values.remember });
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            user: '',
            password: '',
            remember: false
        },
        validationSchema,
        onSubmit(values) {
            handleLogin(values);
        }
    });

    return (
        <div>
            <ModalHeader toggle={props.toogleAndReset}>Ingresar</ModalHeader>

            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="user">Usuario</Label>
                        <Input type="user" id="user" name="user" className="form-control" values={values}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.user && errors.user) ? (<Alert color="danger">{errors.user}</Alert>) : null}

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

                        <div className="l-flex ml-auto" class="col-12">
                            <div class="col-8">
                                <Label check  >
                                    <Input  type = "checkbox" id = "remember" name = "remember" className="form-control" values={values}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />{' '}
                                    Recuerdame
                                </Label>
                            </div>
                        </div>
                    </FormGroup>

                    <br></br>

                    <div className="d-flex justify-content-center">
                        <Button type="submit" value="submit" style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary">Ingresar</Button>
                        <Button onClick={props.switchRestore} style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Olvidé mi contraseña</Button>
                    </div>
                </Form>
            </ModalBody>
        </div>
    );
}

const RenderRestoreComponent = (props) => {

    const validationSchema = yup.object(
        {
            user: yup
                .string()
                .email("Ingresa un correo electronico valido.")
                .required("Este campo es obligatorio"),
        }
    );

    const dispatch = useDispatch();

    const doRestorePassword = user => dispatch(restorePassword(user));




    const handleRestore = values => {
        //console.log(values);


        doRestorePassword({ username: values.user });
    }



    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            user: ''
        },
        validationSchema,
        onSubmit(values) {
            //console.log(values);
            handleRestore(values);
        }
    });

    return (
        <div>
            <ModalHeader toggle={props.toogleAndReset}>Restablecer contraseña</ModalHeader>

            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="user">Correo electrónico</Label>
                        <Input type="user" id="user" name="user" className="form-control" values={values}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.user && errors.user) ? (<Alert color="danger">{errors.user}</Alert>) : null}
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button className="secondary-button" onClick={props.switchRestore}>Cancelar</Button>
                        <Button type="submit" value="submit" className="primary-button">Restablecer</Button>
                    </div>
                </Form>
            </ModalBody>
        </div>
    );
}

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

    const options = () => {
        if (error) {
            return (
                <div>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error ingresando</p>
                    </ModalBody>
                </div>
            );
        }
        if (loading) {
            return (
                <div>
                    <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </div>
            );
        }
        if (result) {
                
                return (
                    <div>
                        
                            <ModalHeader toggle={toogleAndReset}>Ingresar</ModalHeader>
                            <ModalBody>
                                <p>Ingreso exitoso</p>
                            </ModalBody>

                    </div >
                );
            


        }
        else {
            if (restore) {
                if (restoreError) {
                    return (
                        <div>
                            <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                            <ModalBody>
                                <p>Hubo un error Restableciendo contraseña</p>
                            </ModalBody>
                        </div>
                    );
                }
                else if (restoreLoading) {
                    return (
                        <div>
                            <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                            <ModalBody>
                                <Loading />
                            </ModalBody>
                        </div>
                    );
                }
                else if (restoreResult) {
                    if (restoreResult.success) {
                        return (
                            <div>
                                <ModalHeader toggle={toogleAndReset}>Restablecer contraseña</ModalHeader>
                                <ModalBody>
                                    <p>Si tu correo es correcto y esta registrado recibiras un correo con instrucciones para restablecer tu contraseña</p>
                                </ModalBody>
                            </div>
                        );
                    }


                }
                else {
                    return (
                        //<RenderRestoreComponent toogleAndReset={toogleAndReset} switchRestore={switchRestore} />
                        <div></div>
                    );
                }

            }
            else {
                return (
                    <RenderLoginComponent toogleAndReset={toogleAndReset} switchRestore={switchRestore} />
                );
            }


        }
        return (
            <RenderLoginComponent toogleAndReset={toogleAndReset} switchRestore={switchRestore} />
        );
    }

    return (
        <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
            {options()}
        </Modal>
    );



};

LoginComponent.propTypes = {};

export default LoginComponent;