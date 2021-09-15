import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { employees, addEmployee, employeesUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object(

    {
        id: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
            //TO DO: Que el id y el telefono solo sean numeros, con su respectivo regex
        direccion: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
        telefono: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
            .required("Este campo es obligatorio"),
    }
);

const AddEmployeeComponent = (props) => {
    const error = useSelector(state => state.employeesUpdate.errMess);
    const result = useSelector(state => state.employeesUpdate.result);
    const loading = useSelector(state => state.employeesUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(employees());
        dispatch(employeesUpdateReset());
        props.toggle();
    }

    const doAddEmployee = (employeeData) => {
        dispatch(addEmployee(employeeData));
    }

    const uploadChanges = (values) => {

        let tipo = '';
        if(values.vendedor){
            tipo += 'vendedor,';
        }
        if(values.repartidor){
            tipo += 'repartidor,';
        }
        if(values.promotor){
            tipo += 'promotor,';
        }

        const employeeData = {
            id: values.id,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            tipo: tipo
        }
        doAddEmployee(employeeData);
    }

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            direccion: '',
            telefono: '',
            vendedor: false,
            repartidor: false,
            promotor: false
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
            resetForm();
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un empleado</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Añadir un empleado</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un empleado</ModalHeader>
                <ModalBody>
                    <p>Empleado añadido correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    return (
        <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
            <ModalHeader toggle={toogleAndReset}>Añadir un empleado</ModalHeader>

            <ModalBody>

                <Form onSubmit={handleSubmit} >

                    <CardTitle> Ingresa los datos del empleado</CardTitle>
                    <br></br>

                    <FormGroup>
                        <Label htmlFor="id">Documento de identidad</Label>
                        <Input type="text" id="id" name="id" value={values.id}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.id && errors.id) ? (<Alert color="danger">{errors.id}</Alert>) : null}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="text" id="nombre" name="nombre" value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input type="direccion" id="direccion" name="direccion" value={values.direccion}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input type="telefono" id="telefono" name="telefono" value={values.telefono}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="nombre">Tipo:</Label>
                        <div className="l-flex ml-auto " class="col-12" >
                            <div class="col-12 col-sm-8">
                                <Label check  >
                                    <Input type="checkbox" id="vendedor" name="vendedor" className="form-control" checked={values.vendedor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />{' '}
                                    Vendedor
                                </Label>
                            </div>
                        </div>
                        <br/>
                        <div className="l-flex ml-auto " class="col-12" >
                            <div class="col-12 col-sm-8">
                                <Label check  >
                                    <Input type="checkbox" id="repartidor" name="repartidor" className="form-control" checked={values.repartidor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />{' '}
                                    Repartidor
                                </Label>
                            </div>
                        </div>
                        <br/>
                        <div className="l-flex ml-auto " class="col-12" >
                            <div class="col-12 col-sm-8">
                                <Label check  >
                                    <Input type="checkbox" id="promotor" name="promotor" className="form-control" checked={values.promotor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />{' '}
                                    Promotor
                                </Label>
                            </div>
                        </div>
                    </FormGroup>
                    <br/>

                    <div class="d-flex justify-content-center" >
                        <Button style={{ backgroundColor: '#fdd835', color: '#000000' }} type="submit" value="submit"  >Añadir</Button>
                    </div>

                </Form>

            </ModalBody>
        </Modal>
    );

}

AddEmployeeComponent.propTypes = {};

export default AddEmployeeComponent;