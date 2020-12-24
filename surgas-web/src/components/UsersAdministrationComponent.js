import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import User from './UserComponent';
import { useSelector, useDispatch } from 'react-redux';
import { users, searchUser } from '../redux/ActionCreators';

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

    const doSearch = (userData) => dispatch(searchUser(userData));

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nick:'',
            nombre: '',
            correo: '',
            administrador: '0',
            comun: '0'
        },
        validationSchema,
        onSubmit(values) {
            doSearch(values);
        }
    });

    return (
        <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>

                                <CardBody style={{ padding: 8 }}>
                                    <CardTitle> Ingresa los datos de la busqueda </CardTitle>

                                    <Label htmlFor="nick">Usuario</Label>
                                    <Input type="text" id="nick" name="nick" value={values.nick}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nick && errors.nick) ? (<Alert color="danger">{errors.nick}</Alert>) : null}


                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                    <div class="d-flex justify-content-center" >
                                        <Button className="secondary-button" type="submit" value="submit"  >Buscar</Button>
                                    </div>

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
                <RenderSearchResultTuple user={user} key={user.nick}></RenderSearchResultTuple>

            );
        })
        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Administrador</th>
                        <th>Comun</th>
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
        <div className='col'>
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Criterios de busqueda</CardText>
                </CardTitle>
                <CardBody>
                    <SearchCriteria></SearchCriteria>
                </CardBody>
            </Card>
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Usuarios</CardText>
                </CardTitle>
                <CardBody>
                    <SearchResult></SearchResult>
                </CardBody>
            </Card>
            <FloatingButtonContainer>
                <FloatingButtonLink tooltip="Añadir un usuario" >
                    <div  onClick={toggleAddUserModal}>
                        <i className="fa fa-plus fa-2x"></i>
                    </div >
                </FloatingButtonLink>
            </FloatingButtonContainer>
            <AddUserComponent isOpen={isAddClientModalOPen} toggle={toggleAddUserModal}></AddUserComponent>
        </div>

    );
}


UsersAdministration.propTypes = {};

export default UsersAdministration;