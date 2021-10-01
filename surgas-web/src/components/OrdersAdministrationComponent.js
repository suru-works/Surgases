import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import ReactTableOrdersComponent from './ReactTableOrdersComponent';
import { useSelector, useDispatch } from 'react-redux';
import { orders } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddOrderComponent from './AddOrderComponent';

const validationSchema = yup.object(

    {
        numeroMinimo: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .max(99999999999999999999999999999999, "El número no puede tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),
            
        numeroMaximo: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .max(99999999999999999999999999999999, "El número no puede tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),

        precioBrutoMinimo: yup
            .number()
            .max(99999999999999999999999999999999, "El precio no puede tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),

        precioBrutoMaximo: yup
            .number()
            .max(99999999999999999999999999999999, "El precio no puede tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),

        direccion: yup
            .string()
            .max(100, "La dirección debe caber en 100 caracteres"),

        puntosMinimos: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .max(99999999999999999999999999999999, "Los puntos no pueden tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),

        puntosMaximos: yup
            .number()
            .positive("No pueden haber puntos negativos")
            .max(99999999999999999999999999999999, "Los puntos no pueden tener más de 32 dígitos")
            .integer("Ingrese solo números enteros"),

        nota: yup
            .string()
            .max(280, "La nota debe caber en 280 caracteres"),

    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orders());
    }, []);

    const doSearch = (orderData) => dispatch(orders(orderData));


    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            fechaMinima: '',
            fechaMaxima: '',
            numeroMinimo: '',
            numeroMaximo: '',
            horaMinima: '',
            horaMaxima: '',
            direccion: '',
            precioBrutoMinimo: '',
            precioBrutoMaximo: '',
            precioFinalMinimo: '',
            precioFinalMaximo: '',
            estado: 'sin especificar',
            bodega: 'sin especificar',
            puntosMinimos: '',
            puntosMaximos: '',
            tipoCliente: 'sin especificar',
            nota: ''
        },
        validationSchema,
        onSubmit(values) {
            let orderData = []
            if (values.fechaMinima != '') {
                orderData.push('fechaMinima=' + values.fechaMinima);
            }
            if (values.fechaMaxima != '') {
                orderData.push('fechaMaxima=' + values.fechaMaxima);
            }
            if (values.numeroMinimo != '') {
                orderData.push('numeroMinimo=' + values.numeroMinimo);
            }
            if (values.numeroMaximo != '') {
                orderData.push('numeroMaximo=' + values.numeroMaximo);
            }
            if (values.horaMinima != '') {
                orderData.push('horaMinima=' + values.horaMinima);
            }
            if (values.horaMaxima != '') {
                orderData.push('horaMaxima=' + values.horaMaxima);
            }
            if (values.direccion != '') {
                orderData.push('direccion=' + values.direccion);
            }
            if (values.precioBrutoMinimo != '') {
                orderData.push('precioBrutoMinimo=' + values.precioBrutoMinimo);
            }
            if (values.precioBrutoMaximo != '') {
                orderData.push('precioBrutoMaximo=' + values.precioBrutoMaximo);
            }
            if (values.precioFinalMinimo != '') {
                orderData.push('precioFinalMinimo=' + values.precioFinalMinimo);
            }
            if (values.precioFinalMaximo != '') {
                orderData.push('precioFinalMaximo=' + values.precioFinalMaximo);
            }
            if (values.estado != 'sin especificar') {
                orderData.push('estado=' + values.estado);
            }
            if (values.bodega != 'sin especificar') {
                orderData.push('bodega=' + values.bodega);
            }
            if (values.puntosMinimos != '') {
                orderData.push('puntosMinimos=' + values.puntosMinimos);
            }
            if (values.puntosMaximos != '') {
                orderData.push('puntosMaximos=' + values.puntosMaximos);
            }
            if (values.tipoCliente != 'sin especificar') {
                orderData.push('tipoCliente=' + values.tipoCliente);
            }
            if (values.nota != '') {
                orderData.push('nota=' + values.nota);
            }

            doSearch(orderData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >

                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
                <hr />

                <div className='row d-flex justify-content-center '>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="fechaMinima">Fecha mínima</Label>
                        <Input type="date" id="fechaMinima" name="fechaMinima"
                            value={values.fechaMinima}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.fechaMinima && errors.fechaMinima) ? (<Alert color="danger">{errors.fechaMinima}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="fechaMaxima">Fecha máxima</Label>
                        <Input type="date" id="fechaMaxima" name="fechaMaxima"
                            value={values.fechaMaxima}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.fechaMaxima && errors.fechaMaxima) ? (<Alert color="danger">{errors.fechaMaxima}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="numeroMinimo">Número mínimo</Label>
                        <Input type="number" id="numeroMinimo" name="numeroMinimo"
                            value={values.numeroMinimo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.numeroMinimo && errors.numeroMinimo) ? (<Alert color="danger">{errors.numeroMinimo}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="numeroMaximo">Número máximo</Label>
                        <Input type="number" id="numeroMaximo" name="numeroMaximo"
                            value={values.numeroMaximo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.numeroMaximo && errors.numeroMaximo) ? (<Alert color="danger">{errors.numeroMaximo}</Alert>) : null}
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="precioBrutoMinimo">Precio bruto mínimo</Label>
                        <Input type="number" id="precioBrutoMinimo" name="precioBrutoMinimo"
                            value={values.precioBrutoMinimo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.precioBrutoMinimo && errors.precioBrutoMinimo) ? (<Alert color="danger">{errors.precioBrutoMinimo}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="precioBrutoMaximo">Precio bruto máximo</Label>
                        <Input type="number" id="precioBrutoMaximo" name="precioBrutoMaximo"
                            value={values.precioBrutoMaximo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.precioBrutoMaximo && errors.precioBrutoMaximo) ? (<Alert color="danger">{errors.precioBrutoMaximo}</Alert>) : null}
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="horaMinima">Hora mínima</Label>
                        <Input type="time" id="horaMinima" name="horaMinima"
                            value={values.horaMinima}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.horaMinima && errors.horaMinima) ? (<Alert color="danger">{errors.horaMinima}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="horaMaxima">Hora máxima</Label>
                        <Input type="time" id="horaMaxima" name="horaMaxima"
                            value={values.horaMaxima}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.horaMaxima && errors.horaMaxima) ? (<Alert color="danger">{errors.horaMaxima}</Alert>) : null}
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="puntosMinimos">Puntos mínimos</Label>
                        <Input type="number" id="puntosMinimos" name="puntosMinimos"
                            value={values.puntosMinimos}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.puntosMinimos && errors.puntosMinimos) ? (<Alert color="danger">{errors.puntosMinimos}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-2 align-self-end'>
                        <Label htmlFor="puntosMaximos">Puntos máximos</Label>
                        <Input type="number" id="puntosMaximos" name="puntosMaximos"
                            value={values.puntosMaximos}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.puntosMaximos && errors.puntosMaximos) ? (<Alert color="danger">{errors.puntosMaximos}</Alert>) : null}
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-4 align-self-end'>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input type="text" id="direccion" name="direccion"
                            value={values.direccion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
                        <Label htmlFor="estado">Estado</Label>
                        <Input type="select" id="estado" name="estado"
                            value={values.estado}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>en verificación</option>
                            <option>en cola</option>
                            <option>en proceso</option>
                            <option>fiado</option>
                            <option>pago</option>
                        </Input>
                        {(touched.estado && errors.estado) ? (<Alert color="danger">{errors.estado}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
                        <Label htmlFor="bodega">Bodega</Label>
                        <Input type="select" id="bodega" name="bodega"
                            value={values.bodega}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Input>
                        {(touched.bodega && errors.bodega) ? (<Alert color="danger">{errors.bodega}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
                        <Label htmlFor="tipoCliente">Tipo de cliente</Label>
                        <Input type="select" id="tipoCliente" name="tipoCliente"
                            value={values.tipoCliente}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <option>sin especificar</option>
                            <option>empresarial</option>
                            <option>común</option>
                        </Input>
                        {(touched.tipoCliente && errors.tipoCliente) ? (<Alert color="danger">{errors.tipoCliente}</Alert>) : null}
                    </FormGroup>
                    <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                        <Label htmlFor="nota">Nota</Label>
                        <Input type="textarea" id="nota" name="nota"
                            value={values.nota}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.nota && errors.nota) ? (<Alert color="danger">{errors.nota}</Alert>) : null}
                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                        <br></br>
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

    const error = useSelector(state => state.orders.errMess);
    const result = useSelector(state => state.orders.result);
    const loading = useSelector(state => state.orders.isLoading);

    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        return (

            <ReactTableOrdersComponent order={result.data} ></ReactTableOrdersComponent>

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

const OrdersAdministration = () => {
    const [isAddOrderModalOPen, setIsAddOrderModalOpen] = useState(false);

    const toggleAddOrderModal = () => {
        if (isAddOrderModalOPen) {
            setIsAddOrderModalOpen(false);
        } else {
            setIsAddOrderModalOpen(true);
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
                <br />
                <CardTitle tag="h3"> Pedidos</CardTitle>
                <CardBody>
                    <SearchResult></SearchResult>
                </CardBody>

            </Card>
            <FloatingButtonContainer >
                <FloatingButton tooltip="Añadir un pedido" styles={{ backgroundColor: "#fdd835" }} onClick={toggleAddOrderModal} >

                    <i className="fa fa-plus fa-2x plusbutton" ></i>

                </FloatingButton>
            </FloatingButtonContainer>
            <AddOrderComponent isOpen={isAddOrderModalOPen} toggle={toggleAddOrderModal}></AddOrderComponent>
        </div>
    );
}


OrdersAdministration.propTypes = {};

export default OrdersAdministration;