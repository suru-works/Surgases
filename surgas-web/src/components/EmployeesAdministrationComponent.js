import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import { employees } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddEmployeeComponent from './AddEmployeeComponent';
import ReactTableEmployeesComponent from './ReactTableEmployeesComponent';




const validationSchema = yup.object(

    {
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(employees());
    }, []);

    const doSearch = (employeeData) => dispatch(employees(employeeData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            direccion: '',
            telefono: '',
            estado: 'sin especificar',
            tipo: 'sin especificar'

        },
        validationSchema,
        onSubmit(values) {
            let employeeData = []
            if (values.id != '') {
                employeeData.push('id=' + values.id);
            }
            if (values.nombre != '') {
                employeeData.push('nombre=' + values.nombre);
            }
            if (values.direccion != '') {
                employeeData.push('direccion=' + (values.direccion));
            }
            if (values.telefono != '') {
                employeeData.push('telefono=' + (values.telefono));
            }
            if (values.tipo != 'sin especificar') {
                employeeData.push('tipo=' + values.tipo);
            }
            if (values.estado != 'sin especificar') {
                employeeData.push('estado=' + values.estado);
            }


            doSearch(employeeData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >


                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
                <hr />

                <div className='row d-flex justify-content-center '>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="id">Identificacion</Label>
                        <Input type="text" id="id" name="id" value={values.id}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.id && errors.id) ? (<Alert color="danger">{errors.id}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="text" id="nombre" name="nombre" value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input type="direccion" id="direccion" name="direccion" value={values.direccion}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="telefono">Telefono</Label>
                        <Input type="telefono" id="telefono" name="telefono" value={values.telefono}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label for="tipo">Tipo</Label>
                        <Input type="select" name="tipo" id="tipo" value={values.tipo}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>vendedor</option>
                            <option>administrador</option>
                            <option>repartidor</option>
                        </Input>
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label for="estado">Estado</Label>
                        <Input type="select" name="estado" id="estado" value={values.estado}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>activo</option>
                            <option>inactivo</option>
                            <option>despedido</option>
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

    const error = useSelector(state => state.employees.errMess);
    const result = useSelector(state => state.employees.result);
    const loading = useSelector(state => state.employees.isLoading);



    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        return (
            <ReactTableEmployeesComponent employees={result.data} ></ReactTableEmployeesComponent>
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

const EmployeesAdministration = () => {

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
                    <CardText>Empleados</CardText>
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
            <AddEmployeeComponent isOpen={isAddClientModalOPen} toggle={toggleAddUserModal}></AddEmployeeComponent>
        </div>

    );
}


EmployeesAdministration.propTypes = {};

export default EmployeesAdministration;