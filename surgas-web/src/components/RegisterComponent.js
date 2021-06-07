import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Alert, Label
} from 'reactstrap';


import { Loading } from './LoadingComponent';
import { checkTel, registerClient, register, registerReset } from '../redux/ActionCreators';

import { useFormik } from "formik";

import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object(
    {
        username: Yup
            .string()
            .min(4, "El nombre de usuario debe ser de mínimo 4 caracteres")
            .max(15, "El nombre de usuario debe ser de mínimo 4 caracteres")
            .required("Este campo es obligatorio"),
        email: Yup
            .string()
            .email("Ingresa un correo electronico valido.")
            .required("Este campo es obligatorio"),
        password: Yup
            .string()
            .min(8, "la contraseña debe ser de minimo 8 caracteres")
            .max(40, "la contraseña debe ser de maximo 40 caracteres")
            .required("Este campo es obligatorio"),
        name: Yup
            .string(),
        phoneNumber: Yup
            .string()
            .matches(phoneRegExp, 'Ingresa un telefono valido'),
    });

const checkTelValidationSchema = Yup.object(
    {
        phoneNumber: Yup
            .string()
            .matches(phoneRegExp, 'Ingresa un telefono valido'),
    });


const RegisterComponent = (props) => {

    const [requireTel, setRequireTel] = useState(true);
    const [registerClientModal, setRegisterClientModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [clientTel, setClientTel] = useState('');

    const dispatch = useDispatch();

    const checkTelError = useSelector(state => state.checkTel.errMess);
    const checkTelResult = useSelector(state => state.checkTel.result);
    const checkTelLoading = useSelector(state => state.checkTel.isLoading);

    const registerClientError = useSelector(state => state.registerClient.errMess);
    const registerClientResult = useSelector(state => state.registerClient.result);
    const registerClientLoading = useSelector(state => state.registerClient.isLoading);

    const registerError = useSelector(state => state.register.errMess);
    const registerResult = useSelector(state => state.register.result);
    const registerLoading = useSelector(state => state.register.isLoading);

    const toogleAndReset = () => {
        dispatch(registerReset());
        props.toggle();
    }

    const doCheckTel = data => dispatch(checkTel(data));

    const handleRequireTelCheck = values => {
        doCheckTel(values.phoneNumber);
    }

    const checkTelFormik = useFormik({
        initialValues: {
            phoneNumber: ''
        },
        checkTelValidationSchema,
        onSubmit(values) {
            setClientTel(values.phoneNumber);
            handleRequireTelCheck(values);
        }
    });

    const doRegisterClient = data => dispatch(registerClient(data));

    const handleRegisterClient = values => {
        doRegisterClient({
                username:values.username,
                email:values.email,
                password:values.password,
                cliente:clientTel
        });
    }

    const registerClientFormik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            phoneNumber: clientTel
        },
        validationSchema,
        onSubmit(values) {
            handleRegisterClient(values);
        }
    });

    const doRegister = data => dispatch(register(data));

    const handleRegister = values => {
        doRegister({
            user:{
                username:values.username,
                email:values.email,
                password:values.password
            },
            client:{
                telefono:clientTel,
                email: values.email,
                nombre: values.name,
                tipo: 'natural'
            }
        });
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            name: '',
            phoneNumber: clientTel
        },
        validationSchema,
        onSubmit(values) {
            handleRegister(values);
        }
    });
    //Solicitando telefono para registrar al usuario
    if (requireTel) {

        if (checkTelError) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error verificando el telefono.</p>
                    </ModalBody>
                </Modal>
            );
        }
        if (checkTelLoading) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </Modal>
            );
        }
        if (checkTelResult) {

            //Verificando si el telefono ya esta asignado a algun usuario
            if (checkTelResult.foundInUsers) {
                return (
                    <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                        <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                        <ModalBody>
                            <p>El telefono ingresado ya se encuentra registrado.</p>
                        </ModalBody>
                    </Modal>
                );
            }
            //Verificando si el telefono del cliente ya existe en la base de clientes
            else if (checkTelResult.foundInClients) {
                setRequireTel(false);
                setRegisterClientModal(true);                
            }
            else {
                setRequireTel(false);
                setRegisterModal(true);
            }

        }
        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={checkTelFormik.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="phoneNumber">Número de teléfono (ejemplo: 3002312301)</Label>
                                <Input type="tel" id="phoneNumber" name="phoneNumber" className="form-control" values={checkTelFormik.values}
                                    onChange={checkTelFormik.handleChange}
                                    onBlur={checkTelFormik.handleBlur}
                                />
                                {(checkTelFormik.touched.phoneNumber && checkTelFormik.errors.phoneNumber) ? (<Alert color="danger">{checkTelFormik.errors.phoneNumber}</Alert>) : null}
                            </FormGroup>

                            <div className="d-flex justify-content-center">
                                <Button type="submit" value="submit" style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Continuar</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }
    }
    //Registrando el cliente y usuario luego de verificaciones
    if (registerClientModal) {
        // si existe el telefono en la base clientes
        if (registerClientError) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error registrandose.</p>
                    </ModalBody>
                </Modal>
            );
        }
        if (registerClientLoading) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </Modal>
            );
        }
        if (registerClientResult) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Registro exitoso, verifica tu correo electronico para poder ingresar.</p>
                    </ModalBody>
                </Modal>
            );
        }
        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={registerClientFormik.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Correo electrónico*</Label>
                                <Input type="email" id="email" name="email" className="form-control" values={registerClientFormik.values}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.email && registerClientFormik.errors.email) ? (<Alert color="danger">{registerClientFormik.errors.email}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="username">Nombre de usuario*</Label>
                                <Input type="text" id="username" name="username" className="form-control" values={registerClientFormik.values}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.username && registerClientFormik.errors.username) ? (<Alert color="danger">{registerClientFormik.errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password" className="form-control" values={registerClientFormik.values}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.password && registerClientFormik.errors.password) ? (<Alert color="danger">{registerClientFormik.errors.password}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="phoneNumber">Número de teléfono</Label>
                                <Input type="tel" id="phoneNumber" name="phoneNumber" className="form-control" value={clientTel} disabled={true} />
                            </FormGroup>

                            <div className="d-flex justify-content-center">
                                <Button type="submit" value="submit" style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Registrarse</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }
    }
    //si no existe en ninguna parte
    if (registerModal) {
        if (registerError) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error registrandose.</p>
                    </ModalBody>
                </Modal>
            );
        }
        if (registerLoading) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </Modal>
            );
        }
        if (registerResult) {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>
                    <ModalBody>
                        <p>Registro exitoso, verifica tu correo electronico para poder ingresar.</p>
                    </ModalBody>
                </Modal>
            );
        }
        else {
            return (
                <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                    <ModalHeader toggle={toogleAndReset}>Registro</ModalHeader>

                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Correo electrónico*</Label>
                                <Input type="email" id="email" name="email" className="form-control" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="username">Nombre de usuario*</Label>
                                <Input type="text" id="username" name="username" className="form-control" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.username && errors.username) ? (<Alert color="danger">{errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password" className="form-control" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.password && errors.password) ? (<Alert color="danger">{errors.password}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Input type="text" id="name" name="name" className="form-control" values={values}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.name && errors.name) ? (<Alert color="danger">{errors.name}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="phoneNumber">Número de teléfono</Label>
                                <Input type="tel" id="phoneNumber" name="phoneNumber" className="form-control" value={clientTel} disabled={true} />
                            </FormGroup>
                
                            <div className="d-flex justify-content-center">
                                <Button type="submit" value="submit" style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary">Registrarse</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            );
        }
    }

};

RegisterComponent.propTypes = {};

export default RegisterComponent;