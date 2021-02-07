import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { clients, updateClient, deleteClient, clientsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    {
        email: yup
            .string()
            .required("El cliente debe tener un email")
            .email(),

        nombre: yup
            .string()
            .required("El cliente debe tener un nombre"),

        puntos: yup
            .number()
            .required("El cliente debe tener puntos definidos")
            .positive("No pueden haber puntos negativos")
            .integer("Ingrese solo números enteros"),

        descuento: yup
            .number()
            .required("El cliente debe tener descuento definido"),

        tipo: yup
            .string()
            .required("El cliente debe tener un tipo")
    }
);
const EditClientComponent = (props) => {

    const [email] = useState(props.client.email);
    const [nombre] = useState(props.client.nombre);
    const [puntos] = useState(props.client.puntos);
    const [descuento] = useState(props.client.descuento);
    const [tipo] = useState(props.client.tipo);
    const [isOpen] = useState(props.isOpen());

    const error = useSelector(state => state.clientsUpdate.errMess);
    const result = useSelector(state => state.clientsUpdate.result);
    const loading = useSelector(state => state.clientsUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(clients());
        dispatch(clientsUpdateReset());
        props.toggle(props.client.telefono);
    }

    const doUpdateClient = (clientData) => dispatch(updateClient(clientData));

    const uploadChanges = (values) => {
        const clientData = {
            telefono: props.client.telefono,
            email: values.email,
            nombre: values.nombre,
            puntos: values.puntos,
            descuento: values.descuento,
            tipo: values.tipo
        }

        doUpdateClient(clientData);
    }

    const doDeleteClient = (clientData) => dispatch(deleteClient(clientData));

    const deleteThatClient = () => {
        const clientData = {
            telefono: props.client.telefono
        }
        doDeleteClient(clientData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            email: email,
            nombre: nombre,
            puntos: puntos,
            descuento: descuento,
            tipo: tipo
        },
        validationSchema,
        onSubmit(values) {
            const clientData = {
                email: values.email,
                nombre: values.nombre,
                puntos: values.puntos,
                descuento: values.descuento,
                tipo: values.tipo
            }

            uploadChanges(clientData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un cliente</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Editar un cliente</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un cliente</ModalHeader>
                <ModalBody>
                    <p>Cliente editado correctamente.</p>
                </ModalBody>

                <div className="d-flex justify-content-center" >
                    <Button onClick={toogleAndReset} style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }}>Aceptar</Button>
                </div>



            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Editar un cliente</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos del cliente: {nombre}</CardTitle>
                                <CardBody style={{ padding: 8 }}>

                                    <hr />

                                    <div className='row'>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="email">Correo</Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}
                                        </FormGroup>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <Input
                                                type="nombre"
                                                id="nombre"
                                                name="nombre"
                                                value={values.nombre}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                                        </FormGroup>


                                    </div>

                                    <div className="row">

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="tipo">Tipo</Label>
                                            <Input
                                                type="tipo"
                                                id="tipo"
                                                name="tipo"
                                                value={values.tipo}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                                        </FormGroup>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="puntos">Puntos</Label>
                                            <Input
                                                type="number"
                                                id="puntos"
                                                name="puntos"
                                                value={values.puntos}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched.puntos && errors.puntos) ? (<Alert color="danger">{errors.puntos}</Alert>) : null}
                                        </FormGroup>

                                    </div>

                                    <div className="row">

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="descuento">Descuento (%)</Label>
                                            <Input
                                                type="number"
                                                id="descuento"
                                                name="descuento"
                                                value={values.descuento}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched.descuento && errors.descuento) ? (<Alert color="danger">{errors.descuento}</Alert>) : null}
                                        </FormGroup>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <br></br>
                                            <div class="d-flex justify-content-center"  >
                                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type="submit" value="submit"  >Actualizar</Button>
                                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary" onClick={() => deleteThatClient()}  >Eliminar Cliente</Button>
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
EditClientComponent.propTypes = {};

export default EditClientComponent;