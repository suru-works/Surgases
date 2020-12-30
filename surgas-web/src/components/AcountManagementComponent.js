import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { user, updateUser, userReset, users, usersUpdateReset } from '../redux/ActionCreators';
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

    const [nick] = useState(props.user.nick);
    const [nombre] = useState(props.user.nombre);
    const [email] = useState(props.user.email);

    
    const getInitialSelectedTypeIndex = (user) =>{
        if(user.administrador == '1'){
            return ("administrador");
        }
        else if(user.comun == '1'){
            return ("comun");
        }
        else{
            return("indefinido");
        }
    }

    const [selectedType] = useState(()=>getInitialSelectedTypeIndex(props.user));

    const dispatch = useDispatch();

    const error = useSelector(state => state.usersUpdate.errMess);
    const result = useSelector(state => state.usersUpdate.result);
    const loading = useSelector(state => state.usersUpdate.isLoading);

    const toogleAndReset = () => {
        dispatch(user());
        dispatch(users());
        dispatch(usersUpdateReset());
        props.toggle();
    }

    const doUpdateUser = (userData) => dispatch(updateUser(userData));

    const uploadChanges = (values) => {
        const userData = {
            nick: props.user.nick,
            nombre: values.nombre,
            email: values.email,
            administrador: values.administrador,
            comun: values.comun
        }
        doUpdateUser(userData);
    }
    const getFinalTypeData = (tipo) => {
        if (tipo == "comun") {
            return (
                {
                    administrador: '0',
                    comun: '1'
                }
            );
        }
        else if (tipo == "administrador") {
            return (
                {
                    administrador: '1',
                    comun: '0'
                }
            )
        }
        else {
            return (
                {
                    administrador: '0',
                    comun: '0'
                }
            )
        }
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: nombre,
            email: email,
            tipo: selectedType
        },
        validationSchema,
        onSubmit(values) {
            const typeData = getFinalTypeData(values.tipo);
            const userData = {
                nombre: values.nombre,
                email: values.email,
                administrador: typeData.administrador,
                comun: typeData.comun
            }
            uploadChanges(userData);
        }
    });

    const options = () => {
        if (error) {
            return (
                <div>
                    <ModalHeader toggle={toogleAndReset}>Gestionar cuenta</ModalHeader>
                    <ModalBody>
                        <p>Hubo un error cargando tus datos</p>
                    </ModalBody>
                </div>
            );
        }
        if (loading) {
            return (
                <div>
                    <ModalHeader toggle={toogleAndReset}>Gestionar cuenta</ModalHeader>
                    <ModalBody>
                        <Loading />
                    </ModalBody>
                </div>
            );
        }
        if (result) {

            return (
                <div>

                    <ModalHeader toggle={toogleAndReset}>Gestionar cuenta</ModalHeader>
                    <ModalBody>
                        <p>Actualizacion de datos exitosa</p>
                    </ModalBody>

                </div >
            );



        }
        return (
            <div>

                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>

                <ModalBody>

                    <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >

                        <CardTitle> Ingresa los datos del usuario: {nick}</CardTitle>
                        
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
                            <Label for="tipo">Tipo</Label>
                            <Input type="select" name="tipo" id="tipo" value={values.tipo}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>comun</option>
                                <option>administrador</option>
                            </Input>
                        </FormGroup>

                        <br></br>

                        <div class="d-flex justify-content-center" >
                            <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} type="submit" value="submit"  >Actualizar</Button>
                        </div>

                    </Form>

                </ModalBody>

            </div>
        );
    }

    return (
        <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
            {options()}
        </Modal>
    );



};

AcountManagement.propTypes = {};

export default AcountManagement;