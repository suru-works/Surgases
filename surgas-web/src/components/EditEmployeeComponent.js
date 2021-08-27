import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { employees, updateEmployee, deleteEmployee, employeesUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    {

    });

const EmployeeModal = (props) => {
    const [id] = useState(props.employee.id);
    const [nombre] = useState(props.employee.nombre);
    const [direccion] = useState(props.employee.direccion);
    const [telefono] = useState(props.employee.telefono);
    const [estado] = useState(props.employee.estado);
    const [tipo] = useState(props.employee.tipo);

    const error = useSelector(state => state.employeesUpdate.errMess);
    const result = useSelector(state => state.employeesUpdate.result);
    const loading = useSelector(state => state.employeesUpdate.isLoading);



    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(employees())
        dispatch(employeesUpdateReset());
        props.toggle();
    }

    const doUpdateEmployee = (employeeData) => dispatch(updateEmployee(employeeData));

    const uploadChanges = (values) => {
        let type = '';
        if (values.vendedor) {
            type += 'vendedor,';
        }
        if (values.repartidor) {
            type += 'repartidor,';
        }
        if (values.promotor) {
            type += 'promotor,';
        }
        const employeeData = {
            id: id,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            estado: values.estado,
            tipo: type
        };
        doUpdateEmployee(employeeData);
    }

    const doDeleteEmployee = (employeeData) => dispatch(deleteEmployee(employeeData));

    const deleteThatEmployee = () => {
        const employeeData = {
            id: props.employee.id
        }
        doDeleteEmployee(employeeData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            estado: estado,
            vendedor: tipo.includes(' vendedor,'),
            repartidor: tipo.includes(' repartidor,'),
            promotor: tipo.includes(' promotor,')
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un empleado</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un empleado</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un empleado</ModalHeader>
                <ModalBody>
                    <p>Empleado editado correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Editar un empleado</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        {values.vendedor}
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos del usuario: {id}</CardTitle>
                                <CardBody style={{ padding: 8 }}>

                                    <FormGroup>

                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>

                                        <Label htmlFor="direccion">Direccion</Label>
                                        <Input type="direccion" id="direccion" name="direccion" value={values.direccion}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>

                                        <Label htmlFor="telefono">Telefono</Label>
                                        <Input type="telefono" id="telefono" name="telefono" value={values.telefono}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>

                                        <Label htmlFor="nombre">Tipo</Label>
                                        <div className="l-flex ml-auto " class="col-12" >
                                            <div class="col-12 col-sm-8">
                                                <Label check  >
                                                    <Input type="checkbox" id="vendedor" name="vendedor" className="form-control" value={'on'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />{' '}
                                                    Vendedor
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="l-flex ml-auto " class="col-12" >
                                            <div class="col-12 col-sm-8">
                                                <Label check  >
                                                    <Input type="checkbox" id="repartidor" name="repartidor" className="form-control" values={values.repartidor}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />{' '}
                                                    Repartidor
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="l-flex ml-auto " class="col-12" >
                                            <div class="col-12 col-sm-8">
                                                <Label check  >
                                                    <Input type="checkbox" id="promotor" name="promotor" className="form-control" values={values.promotor}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />{' '}
                                                    Promotor
                                                </Label>
                                            </div>
                                        </div>
                                    </FormGroup>

                                    <br></br>

                                    <div class="d-flex justify-content-center" >
                                        <Button style={{ backgroundColor: '#fdd835', color: '#000000' }} type="submit" value="submit">Actualizar</Button>
                                    </div>

                                </CardBody>

                            </Card>

                        </Form>

                    </div>

                </ModalBody>
            </Modal >

        );
    }

}

const EditEmployeeComponent = (props) => {

    if (props.employee) {
        return (
            <EmployeeModal employee={props.employee} isOpen={props.isOpen} toggle={props.toggle}></EmployeeModal>
        );
    }
    return (
        <div></div>
    );

}

EditEmployeeComponent.propTypes = {};

export default EditEmployeeComponent;