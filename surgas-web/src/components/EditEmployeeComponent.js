import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { updateEmployee, deleteEmployee, employeesUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    //TO DO: hacer las validaciones
    {
    });
const EditEmployeeComponent = (props) => {
    const [id] = useState(props.employee.id);
    const [nombre] = useState(props.employee.nombre);
    const [direccion] = useState(props.employee.direccion);
    const [telefono] = useState(props.employee.telefono);
    const [estado] = useState(props.employee.estado);
    const [tipo] = useState(props.employee.tipo);
    const [username] = useState(props.employee.username);

    const error = useSelector(state => state.employeesUpdate.errMess);
    const result = useSelector(state => state.employeesUpdate.result);
    const loading = useSelector(state => state.employeesUpdate.isLoading);



    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(employeesUpdateReset());
        props.toggle();
    }

    const doUpdateEmployee = (employeeData) => dispatch(updateEmployee(employeeData));

    const uploadChanges = (values) => {
        const employeeData = {
            id: props.employee.id,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            estado: values.estado,
            tipo: values.tipo,
            username: values.username
        }
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
            tipo: tipo,
            username: username
        },
        validationSchema,
        onSubmit(values) {
            const employeeData = {
                nombre: values.nombre,
                direccion: values.direccion,
                telefono: values.telefono,
                estado: values.estado,
                tipo: values.tipo,
                username: values.username
            }
            uploadChanges(employeeData);
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
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
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

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Editar un empleado</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
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
                                            <option>vendedor</option>
                                            <option>administrador</option>
                                            <option>repartidor</option>
                                        </Input>
                                    </FormGroup>

                                    <div class="d-flex justify-content-center" >
                                        <FormGroup>

                                            <div className="d-flex justify-content-center" >

                                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type="submit" value="submit"  >Actualizar</Button>
                                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary" onClick={() => deleteThatEmployee()}  >Eliminar Empleado</Button>
                                            </div>
                                        </FormGroup>

                                    </div>

                                </CardBody>

                            </Card>

                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }

}
EditEmployeeComponent.propTypes = {};

export default EditEmployeeComponent;