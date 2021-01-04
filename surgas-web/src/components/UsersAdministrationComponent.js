import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import User from './UserComponent';
import { useSelector, useDispatch } from 'react-redux';
import { users } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddUserComponent from './AddUserComponent';




const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);
/* TO DO: implementar la busqueda de usuarios */
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
            tipo: 'sin especificar'
        },
        validationSchema,
        onSubmit(values) {
            let userData = []
            if(values.username != ''){
                userData.push('username='+values.username);
            }
            if(values.nombre != ''){
                userData.push('nombre='+values.nombre);
            }
            if(values.email != ''){
                userData.push('email='+(values.email).replace('@','%40'));
            }
            if(values.tipo != 'sin especificar'){
                userData.push('tipo='+values.tipo);
            }
             
            doSearch(userData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >
                <Card style={{ padding: 11 }}>
                    <br></br>
                    <CardTitle> Ingresa los datos de la búsqueda</CardTitle>
                    <CardBody style={{ padding: 8 }}>

                        <hr />

                        <div className='row'>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="username">Usuario</Label>
                                <Input type="text" id="username" name="username" value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.username && errors.username) ? (<Alert color="danger">{errors.username}</Alert>) : null}

                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                            </FormGroup>


                        </div>

                        <div className='row'>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="email">Correo</Label>
                                <Input type="email" id="email" name="email" value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}

                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label for="tipo">Tipo</Label>
                                <Input type="select" name="tipo" id="tipo" value={values.tipo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option>sin especificar</option>
                                    <option>vendedor</option>
                                    <option>administrador</option>
                                    <option>cliente</option>
                                </Input>
                            </FormGroup>

                        </div>


                        <FormGroup>
                            <br></br>
                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} 
                                className="secondary-button" type="submit" value="submit"  >Buscar</Button>
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} 
                                className="secondary-button" onClick={resetForm}>Reiniciar parametros</Button>
                            </div>
                        </FormGroup>



                    </CardBody>

                </Card>


            </Form>

        </div>
    );
}

const RenderSearchResultTuple = (props) => {
    const userData = props.user;
    return (
        <User user={userData} />
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
        const ResultTuples = result.data.map((user) => {
            return (
                <RenderSearchResultTuple user={user} key={user.username}></RenderSearchResultTuple>

            );
        })
        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {ResultTuples}
                </tbody>
            </Table>
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
            <Card  >
                <CardTitle >
                    <CardText>Criterios de búsqueda</CardText>
                </CardTitle>
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