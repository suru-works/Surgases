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

const phoneRegExp = /^[0-9]{7,14}$/


const validationSchema = Yup.object(
    {
        username: Yup
            .string()
            .min(4, "El nombre de usuario debe ser de mínimo 4 caracteres")
            .max(15, "El nombre de usuario debe ser de máximo 15 caracteres")
            .required("Este campo es obligatorio"),
        email: Yup
            .string()
            .email("Ingresa un correo electronico válido.")
            .required("Este campo es obligatorio"),
        password: Yup
            .string()
            .min(8, "La contraseña debe ser de mínimo 8 caracteres")
            .max(40, "La contraseña debe ser de máximo 40 caracteres")
            .required("Este campo es obligatorio"),
        password2: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales')
            .required("Este campo es obligatorio"),
        name: Yup
            .string(),
        phoneNumber: Yup
            .string()
            .matches(phoneRegExp, 'Ingresa un teléfono válido'),
    });

const checkTelValidationSchema = Yup.object(
    {
        phoneNumber: Yup
            .number()
            .required("Este campo es obligatorio")
            .min(7, "El teléfono debe ser de mínimo 7 dígitos")
            .max(14, "El teléfono debe ser de máximo 14 dígitos")
            //.matches(phoneRegExp, "Ingresa un teléfono válido"),
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
            phoneNumber: ""
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
            password2: '',
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

    const registerFormik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            password2: '',
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
                            <p>El teléfono ingresado ya se encuentra registrado.</p>
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
                                <Input type="phone" id="phoneNumber" name="phoneNumber" className="form-control" value={checkTelFormik.values.phoneNumber}
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
                                <Input type="email" id="email" name="email" className="form-control" value={registerClientFormik.values.email}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.email && registerClientFormik.errors.email) ? (<Alert color="danger">{registerClientFormik.errors.email}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="username">Nombre de usuario*</Label>
                                <Input type="text" id="username" name="username" className="form-control" value={registerClientFormik.values.username}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.username && registerClientFormik.errors.username) ? (<Alert color="danger">{registerClientFormik.errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password" className="form-control" value={registerClientFormik.values.password}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.password && registerClientFormik.errors.password) ? (<Alert color="danger">{registerClientFormik.errors.password}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Confirme su contraseña*</Label>
                                <Input type="password" id="password2" name="password2" className="form-control" value={registerClientFormik.values.password2}
                                    onChange={registerClientFormik.handleChange}
                                    onBlur={registerClientFormik.handleBlur}
                                />
                                {(registerClientFormik.touched.password2 && registerClientFormik.errors.password2) ? (<Alert color="danger">{registerClientFormik.errors.password2}</Alert>) : null}
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
                        <Form onSubmit={registerFormik.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Correo electrónico*</Label>
                                <Input type="email" id="email" name="email" className="form-control" value={registerFormik.values.email}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {(registerFormik.touched.email && registerFormik.errors.email) ? (<Alert color="danger">{registerFormik.errors.email}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="username">Nombre de usuario*</Label>
                                <Input type="text" id="username" name="username" className="form-control" value={registerFormik.values.username}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {(registerFormik.touched.username && registerFormik.errors.username) ? (<Alert color="danger">{registerFormik.errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Contraseña*</Label>
                                <Input type="password" id="password" name="password" className="form-control" value={registerFormik.values.password}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {(registerFormik.touched.password && registerFormik.errors.password) ? (<Alert color="danger">{registerFormik.errors.password}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password2">Confirme su contraseña*</Label>
                                <Input type="password" id="password2" name="password2" className="form-control" value={registerFormik.values.password2}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {(registerFormik.touched.password2 && registerFormik.errors.password2) ? (<Alert color="danger">{registerFormik.errors.password2}</Alert>) : null}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="name">Nombre</Label>
                                <Input type="text" id="name" name="name" className="form-control" value={registerFormik.values.name}
                                    onChange={registerFormik.handleChange}
                                    onBlur={registerFormik.handleBlur}
                                />
                                {(registerFormik.touched.name && registerFormik.errors.name) ? (<Alert color="danger">{registerFormik.errors.name}</Alert>) : null}
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