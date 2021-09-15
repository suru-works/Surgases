import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import { users } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddUserComponent from './AddUserComponent';
import ReactTableUsersComponent from './ReactTableUsersComponent';




const validationSchema = yup.object(

    {
        username: yup
            .string()
            .max(30, "El usuario debe ser de máximo 30 caracteres"),

        nombre: yup
            .string()
            .max(25, "El nombre debe ser de máximo 25 caracteres"),

        email: yup
            .string()
            .email("Ingrese un correo válido (correo@serv.dom)")
            .max(100, "El correo debe ser de máximo 100 caracteres")
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(users());
    }, []);

    const doSearch = (userData) => dispatch(users(userData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            username: '',
            nombre: '',
            email: '',
            empleado: '',
            cliente: '',
            es_admin: 'sin especificar',
            verificado: 'sin especificar'
        },
        validationSchema,
        onSubmit(values) {
            let userData = []
            if (values.username != '') {
                userData.push('username=' + values.username);
            }
            if (values.nombre != '') {
                userData.push('nombre=' + values.nombre);
            }
            if (values.email != '') {
                userData.push('email=' + (values.email).replace('@', '%40'));
            }
            if (values.empleado != '') {
                userData.push('empleado=' + values.empleado);
            }
            if (values.cliente != '') {
                userData.push('cliente=' + values.cliente);
            }
            if (values.es_admin != 'sin especificar'){
                if(values.es_admin == 'si'){
                    userData.push('es_admin=' + 1);
                }
                else{
                    userData.push('es_admin=' + 0);
                }
            }
            if (values.verificado != 'sin especificar'){
                if(values.verificado == 'si'){
                    userData.push('verificado=' + 1);
                }
                else{
                    userData.push('verificado=' + 0);
                }
            }

            console.log(userData);

            doSearch(userData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >


                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
                <hr />

                <div className='row d-flex justify-content-center '>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="username">Usuario</Label>
                        <Input type="text" id="username" name="username" value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.username && errors.username) ? (<Alert color="danger">{errors.username}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="text" id="nombre" name="nombre" value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="email">Correo</Label>
                        <Input type="email" id="email" name="email" value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="empleado">Id de empleado</Label>
                        <Input type="empleado" id="empleado" name="empleado" value={values.empleado}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.empleado && errors.empleado) ? (<Alert color="danger">{errors.empleado}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="cliente">Id de cliente</Label>
                        <Input type="cliente" id="cliente" name="cliente" value={values.cliente}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.cliente && errors.cliente) ? (<Alert color="danger">{errors.cliente}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label for="es_admin">Administrador</Label>
                        <Input type="select" name="es_admin" id="es_admin" value={values.es_admin}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>si</option>
                            <option>no</option>
                        </Input>
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label for="verificado">Verificado</Label>
                        <Input type="select" name="verificado" id="verificado" value={values.verificado}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>si</option>
                            <option>no</option>
                        </Input>
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-12 col-md-12 col-lg-6 align-self-end'>
                        <div class="d-flex justify-content-center" >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Buscar</Button>
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                        </div>
                    </FormGroup>

                </div>

            </Form>

        </div>
    );
}





const SearchResult = () => {

    const error = useSelector(state => state.users.errMess);
    const result = useSelector(state => state.users.result);
    const loading = useSelector(state => state.users.isLoading);



    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        return (
            <ReactTableUsersComponent users={result.data} ></ReactTableUsersComponent>

        );
    }
    if (error) {
        return (
            <div> hubo un error</div>
        );

    }
    return (
        <div></div>
    );

}

const UsersAdministration = () => {

    const [isAddClientModalOPen, setIsAddClientModalOPen] = useState(false);

    const toggleAddUserModal = () => {
        if (isAddClientModalOPen) {
            setIsAddClientModalOPen(false);
        } else {
            setIsAddClientModalOPen(true);
        }
    }

    return (
        <div className='col' >
            <Card style={{ margin: "10px", padding: "7px" }}>
                <CardBody>
                    <SearchCriteria></SearchCriteria>
                </CardBody>
            </Card>
            <Card>
                <CardTitle>
                    <CardText>Usuarios</CardText>
                </CardTitle>
                <CardBody>
                    <SearchResult></SearchResult>
                </CardBody>
            </Card>
            <FloatingButtonContainer >
                <FloatingButton tooltip="Añadir un usuario" styles={{ backgroundColor: "#fdd835" }} onClick={toggleAddUserModal} >

                    <i className="fa fa-plus fa-2x plusbutton" ></i>

                </FloatingButton>
            </FloatingButtonContainer>
            <AddUserComponent isOpen={isAddClientModalOPen} toggle={toggleAddUserModal}></AddUserComponent>
        </div>

    );
}


UsersAdministration.propTypes = {};

export default UsersAdministration;