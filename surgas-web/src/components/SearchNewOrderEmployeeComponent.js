import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import { newOrderEmployees } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import Employee from './EmployeeComponent';

const validationSchema = yup.object(

    {
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        let employeeData = [];
        employeeData.push('tipo=' + 'repartidor,');
        employeeData.push('estado=' + 'activo');
        dispatch(newOrderEmployees(employeeData));
    }, []);

    const doSearch = (employeeData) => dispatch(newOrderEmployees(employeeData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            direccion: '',
            telefono: '',
            estado: 'sin especificar',
            tipo: 'sin especificar',
            username: ''

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
            employeeData.push('tipo=' + 'repartidor');
            employeeData.push('estado=' + 'activo');
            if (values.username != '') {
                employeeData.push('username=' + values.username);
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
                        <Label htmlFor="id">Identificación</Label>
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
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input type="telefono" id="telefono" name="telefono" value={values.telefono}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}

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

const EmployeeRow = (props) => {
    const toggleAndSendEmployee = () => {
        props.setNewOrderEmpleado(props.employee);
        props.toggleAndReset();
    }
    return (
        <tr onClick={() => toggleAndSendEmployee()}>
            <th scope="row">{props.employee.id}</th>
            <td>{props.employee.nombre}</td>
            <td>{props.employee.direccion}</td>
            <td>{props.employee.telefono}</td>
            <td>{props.employee.estado}</td>
            <td>{props.employee.tipo}</td>
            <td>{props.employee.username}</td>
        </tr>
    );
}

const RenderSearchResultTuple = (props) => {
    const employeeData = props.employee;
    return (
        <EmployeeRow employee={employeeData} setNewOrderEmpleado={props.setNewOrderEmpleado} toggleAndReset={props.toggleAndReset} />
    );

}
const SearchResult = (props) => {

    const error = useSelector(state => state.newOrderEmployees.errMess);
    const result = useSelector(state => state.newOrderEmployees.result);
    const loading = useSelector(state => state.newOrderEmployees.isLoading);



    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((employee) => {
            return (
                <RenderSearchResultTuple employee={employee} key={employee.id} setNewOrderEmpleado={props.setNewOrderEmpleado} toggleAndReset={props.toggleAndReset}></RenderSearchResultTuple>

            );
        })
        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>direccion</th>
                        <th>telefono</th>
                        <th>estado</th>
                        <th>tipo</th>
                        <th>usuario</th>
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

const SearchNewOrderEmployee = (props) => {
    const toggleAndReset = () => {
        props.toggle();
    }
    return (
        <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
            <ModalHeader toggle={toggleAndReset}>Buscar repartidor para el pedido</ModalHeader>
            <ModalBody>
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
                        <SearchResult setNewOrderEmpleado={props.setNewOrderEmpleado} toggleAndReset={toggleAndReset}></SearchResult>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
}

SearchNewOrderEmployee.propTypes = {};

export default SearchNewOrderEmployee;