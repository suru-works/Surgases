import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { clients } from '../redux/ActionCreators';
import Client from './ClientTableComponent';
import { Loading } from './LoadingComponent';
import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddClientComponent from './AddClientComponent';

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
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
        
        fechaRegistroMinima: yup
            .string(),
        
        fechaRegistroMaxima: yup
            .string(),
        
        puntosMinimos: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .integer("Ingrese solo números enteros"),
        
        puntosMaximos: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .integer("Ingrese solo números enteros"),
        
        descuentoMinimo: yup
            .number()
            .max(100, "El descuento debe ser de máximo el 100%"),

        descuentoMaximo: yup
            .number()
            .max(100, "El descuento debe ser de máximo el 100%"),
        
        fechaPedidoMinima: yup
            .string(),
        
        fechaPedidoMaxima: yup
            .string(),
        
        numeroUltimoPedidoMinimo: yup
            .number()
            .positive("El número de pedido no puede ser negativo")
            .integer("Ingrese solo números enteros"),
        
        numeroUltimoPedidoMaximo: yup
            .number()
            .positive("El número de pedido no puede ser negativo")
            .integer("Ingrese solo números enteros"),
        
        numeroPedidosMinimo: yup
            .number()
            .positive("La cantidad de pedidos no puede ser negativa")
            .integer("Ingrese solo números enteros"),
        
        numeroPedidosMaximo: yup
            .number()
            .positive("La cantidad de pedidos no puede ser negativa")
            .integer("Ingrese solo números enteros")
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    /* useEffect(() => {
        dispatch(clients());
    }, []); */

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
                clientData.push('descuentoMinimo=' + (values.descuentoMinimo / 100));
            }
            if (values.descuentoMaximo != '') {
                clientData.push('descuentoMaximo=' + (values.descuentoMaximo / 100));
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
                                <Input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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

                        </div>

                        <div className="row">

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

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="fechaRegistroMaxima">Fecha de Registro M&aacute;xima</Label>
                                <Input
                                    type="date"
                                    id="fechaRegistroMaxima"
                                    name="fechaRegistroMaxima"
                                    value={values.fechaRegistroMaxima}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.fechaRegistroMaxima && errors.fechaRegistroMaxima) ? (<Alert color="danger">{errors.fechaRegistroMaxima}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="puntosMinimos">Puntos M&iacute;nimos</Label>
                                <Input
                                    type="number"
                                    id="puntosMinimos"
                                    name="puntosMinimos"
                                    value={values.puntosMinimos}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.puntosMinimos && errors.puntosMinimos) ? (<Alert color="danger">{errors.puntosMinimos}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="puntosMaximos">Puntos M&aacute;ximos</Label>
                                <Input
                                    type="number"
                                    id="puntosMaximos"
                                    name="puntosMaximos"
                                    value={values.puntosMaximos}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.puntosMaximos && errors.puntosMaximos) ? (<Alert color="danger">{errors.puntosMaximos}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="descuentoMinimo">Descuento M&iacute;nimo (%)</Label>
                                <Input
                                    type="number"
                                    id="descuentoMinimo"
                                    name="descuentoMinimo"
                                    value={values.descuentoMinimo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.descuentoMinimo && errors.descuentoMinimo) ? (<Alert color="danger">{errors.descuentoMinimo}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="descuentoMaximo">Descuento M&aacute;ximo (%)</Label>
                                <Input
                                    type="number"
                                    id="descuentoMaximo"
                                    name="descuentoMaximo"
                                    value={values.descuentoMaximo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.descuentoMaximo && errors.descuentoMaximo) ? (<Alert color="danger">{errors.descuentoMaximo}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="fechaPedidoMinima">Fecha de Pedido M&iacute;nima</Label>
                                <Input
                                    type="date"
                                    id="fechaPedidoMinima"
                                    name="fechaPedidoMinima"
                                    value={values.fechaPedidoMinima}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.fechaPedidoMinima && errors.fechaPedidoMinima) ? (<Alert color="danger">{errors.fechaPedidoMinima}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="fechaPedidoMaxima">Fecha de Pedido M&aacute;xima</Label>
                                <Input
                                    type="date"
                                    id="fechaPedidoMaxima"
                                    name="fechaPedidoMaxima"
                                    value={values.fechaPedidoMaxima}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.fechaPedidoMaxima && errors.fechaPedidoMaxima) ? (<Alert color="danger">{errors.fechaPedidoMaxima}</Alert>) : null}
                            </FormGroup>
                            
                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="numeroUltimoPedidoMinimo">N&uacute;mero del &Uacute;ltimo Pedido M&iacute;nimo</Label>
                                <Input
                                    type="number"
                                    id="numeroUltimoPedidoMinimo"
                                    name="numeroUltimoPedidoMinimo"
                                    value={values.numeroUltimoPedidoMinimo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.numeroUltimoPedidoMinimo && errors.numeroUltimoPedidoMinimo) ? (<Alert color="danger">{errors.numeroUltimoPedidoMinimo}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="numeroUltimoPedidoMaximo">N&uacute;mero del &Uacute;ltimo Pedido M&aacute;ximo</Label>
                                <Input
                                    type="number"
                                    id="numeroUltimoPedidoMaximo"
                                    name="numeroUltimoPedidoMaximo"
                                    value={values.numeroUltimoPedidoMaximo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.numeroUltimoPedidoMaximo && errors.numeroUltimoPedidoMaximo) ? (<Alert color="danger">{errors.numeroUltimoPedidoMaximo}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="numeroPedidosMinimo">N&uacute;mero Total de Pedidos M&iacute;nimo</Label>
                                <Input
                                    type="number"
                                    id="numeroPedidosMinimo"
                                    name="numeroPedidosMinimo"
                                    value={values.numeroPedidosMinimo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.numeroPedidosMinimo && errors.numeroPedidosMinimo) ? (<Alert color="danger">{errors.numeroPedidosMinimo}</Alert>) : null}
                            </FormGroup>

                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="numeroPedidosMaximo">N&uacute;mero Total de Pedidos M&aacute;ximo</Label>
                                <Input
                                    type="number"
                                    id="numeroPedidosMaximo"
                                    name="numeroPedidosMaximo"
                                    value={values.numeroPedidosMaximo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {(touched.numeroPedidosMaximo && errors.numeroPedidosMaximo) ? (<Alert color="danger">{errors.numeroPedidosMaximo}</Alert>) : null}
                            </FormGroup>

                        </div>

                        <div className="row">
                            <FormGroup className='col-12 col-sm-6'>
                                <br></br>

                                <div class="d-flex justify-content-center">
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

const RenderSearchResultTuple = (props) => {
    const clientData = props.client;

    return (
        <Client client={clientData} />
    );

}

const SearchResult = () => {

    const error = useSelector(state => state.clients.errMess);
    const result = useSelector(state => state.clients.result);
    const loading = useSelector(state => state.clients.isLoading);

    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((client) => {
            return (

                <RenderSearchResultTuple client={client} key={client.telefono} />

            );
        })

        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tel&eacute;fono</th>
                        <th>Correo</th>
                        <th>Fecha de Registro</th>
                        <th>Puntos</th>
                        <th>Descuento</th>
                        <th>Tipo</th>
                        <th>Fecha del &Uacute;ltimo Pedido</th>
                        <th>N&uacute;mero del &Uacute;ltimo Pedido</th>
                        <th>N&uacute;mero Total de Pedidos</th>
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

const ClientsAdministration = () => {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const userResult = useSelector(state => state.user.result);

    const toggleAddClientModal = () => {
        if (isAddClientModalOpen) {
            setIsAddClientModalOpen(false);
        } else {
            setIsAddClientModalOpen(true);
        }
    }

    if (userResult.data.tipo=== "administrador") {
        return (
            <div className='col' >
                <Card  >
                    <CardBody>
                        <SearchCriteria></SearchCriteria>
                    </CardBody>
                </Card>
                <Card>
                    <CardTitle>
                        <CardText>Clientes</CardText>
                    </CardTitle>
                    <CardBody>
                        <SearchResult></SearchResult>
                    </CardBody>
                </Card>

                <FloatingButtonContainer >
                    <FloatingButton tooltip="Añadir un cliente" styles={{ backgroundColor: "#fdd835" }} onClick={toggleAddClientModal} >

                        <i className="fa fa-plus fa-2x plusbutton" ></i>

                    </FloatingButton>
                </FloatingButtonContainer>

                <AddClientComponent isOpen={isAddClientModalOpen} toggle={toggleAddClientModal} />
            </div>
        );

    }
    else {
        return (
            <div className='col' >
                <Card  >
                    <CardBody>
                        <SearchCriteria></SearchCriteria>
                    </CardBody>
                </Card>
                <Card>
                    <CardTitle>
                        <CardText>Clientes</CardText>
                    </CardTitle>
                    <CardBody>
                        <SearchResult />
                    </CardBody>
                </Card>
            </div>

        );
    }
}


ClientsAdministration.propTypes = {};

export default ClientsAdministration;