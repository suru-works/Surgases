import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { clients } from '../redux/ActionCreators';

const validationSchema = yup.object(

    {
        telefono: yup
            .number()
            .max(50, "El teléfono debe ser de máximo 50 caracteres"),

        email: yup
            .string()
            .email("Ingrese un correo válido (correo@serv.dom)")
            .max(100, "El correo debe ser de máximo 100 caracteres"),

        nombre: yup
            .string()
            .max(25, "El nombre debe ser de máximo 25 caracteres")
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clients());
    }, []);

    const doSearch = (clientData) => dispatch(clients(clientData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: '',
            email: '',
            nombre: '',
            fechaRegistroMinima: '',
            fechaRegistroMaxima: '',
            puntosMinimos: '',
            puntosMaximos: '',
            descuentoMinimo: '',
            descuentoMaximo: '',
            tipo: '',
            fechaPedidoMinima: '',
            fechaPedidoMaxima: '',
            numeroUltimoPedidoMinimo: '',
            numeroUltimoPedidoMaximo: '',
            numeroPedidosMinimo: '',
            numeroPedidosMaximo: ''
        },
        validationSchema,
        onSubmit(values) {
            let clientData = []
            if (values.telefono != '') {
                clientData.push('telefono=' + values.telefono);
            }
            if (values.email != '') {
                clientData.push('email=' + values.email.replace('@','%40'));
            }
            if (values.nombre != '') {
                clientData.push('nombre=' + values.nombre);
            }
            if (values.fechaRegistroMinima != '') {
                clientData.push('fechaRegistroMinima=' + values.fechaRegistroMinima);
            }
            if (values.fechaRegistroMaxima != '') {
                clientData.push('fechaRegistroMaxima=' + values.fechaRegistroMaxima);
            }
            if (values.puntosMinimos != '') {
                clientData.push('puntosMinimos=' + values.puntosMinimos);
            }
            if (values.puntosMaximos != '') {
                clientData.push('puntosMaximos=' + values.puntosMaximos);
            }
            if (values.descuentoMinimo != '') {
                clientData.push('descuentoMinimo=' + values.descuentoMinimo);
            }
            if (values.descuentoMaximo != '') {
                clientData.push('descuentoMaximo=' + values.descuentoMaximo);
            }
            if (values.tipo != '') {
                clientData.push('tipo=' + values.tipo);
            }
            if (values.fechaPedidoMinima != '') {
                clientData.push('fechaPedidoMinima=' + values.fechaPedidoMinima);
            }
            if (values.fechaPedidoMaxima != '') {
                clientData.push('fechaPedidoMaxima=' + values.fechaPedidoMaxima);
            }
            if (values.numeroUltimoPedidoMinimo != '') {
                clientData.push('numeroUltimoPedidoMinimo=' + values.numeroUltimoPedidoMinimo);
            }
            if (values.numeroUltimoPedidoMaximo != '') {
                clientData.push('numeroUltimoPedidoMaximo=' + values.numeroUltimoPedidoMaximo);
            }
            if (values.numeroPedidosMinimo != '') {
                clientData.push('numeroPedidosMinimo=' + values.numeroPedidosMinimo);
            }
            if (values.numeroPedidosMaximo != '') {
                clientData.push('numeroPedidosMaximo=' + values.numeroPedidosMaximo);
            }

            doSearch(clientData);
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
                                <Label htmlFor="telefono">Tel&eacute;fono</Label>
                                <Input type="text" id="telefono" name="telefono" value={values.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}

                            </FormGroup>

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

                        </div>

                        <div className='row'>

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

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="fechaRegistroMinima">Fecha de Registro M&iacute;nima</Label>
                                <Input
                                    type="date"
                                    id="fechaRegistroMinima"
                                    name="fechaRegistroMinima"
                                    value={values.fechaRegistroMinima}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.fechaRegistroMinima && errors.fechaRegistroMinima) ? (<Alert color="danger">{errors.fechaRegistroMinima}</Alert>) : null}

                            </FormGroup>

                        </div>

                        <div className="row">
                            <FormGroup className='col-12 col-sm-6'>
                                <br></br>

                                <div class="d-flex justify-content-center"  >
                                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Buscar</Button>
                                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                                </div>

                            </FormGroup>
                        </div>

                    </CardBody>

                </Card>


            </Form>

        </div>
    );
}

const ClientsAdministration = () => {
    return (
        <div>
            <SearchCriteria />
        </div>
    );
}


ClientsAdministration.propTypes = {};

export default ClientsAdministration;