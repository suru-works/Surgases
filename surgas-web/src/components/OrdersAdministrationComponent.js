import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import OrderRow from './OrderRowComponent';
import { useSelector, useDispatch } from 'react-redux';
import { orders } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddOrderComponent from './AddOrderComponent';

const validationSchema = yup.object(

    {
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    /* useEffect(() => {
        dispatch(orders());
    }, []); */

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

            doSearch(orderData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >
                <br></br>
                <CardTitle> Ingresa los datos de la búsqueda</CardTitle>
                <CardBody style={{ padding: 8 }}>
                    <hr />

                    <div className='row'>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="fechaMinima">Fecha minima</Label>
                            <Input type="date" id="fechaMinima" name="fechaMinima"
                                value={values.fechaMinima}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.fechaMinima && errors.fechaMinima) ? (<Alert color="danger">{errors.fechaMinima}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="fechaMaxima">Fecha maxima</Label>
                            <Input type="date" id="fechaMaxima" name="fechaMaxima"
                                value={values.fechaMaxima}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.fechaMaxima && errors.fechaMaxima) ? (<Alert color="danger">{errors.fechaMaxima}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="numeroMinimo">Numero minimo</Label>
                            <Input type="number" id="numeroMinimo" name="numeroMinimo"
                                value={values.numeroMinimo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.numeroMinimo && errors.numeroMinimo) ? (<Alert color="danger">{errors.fechaMinima}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="numeroMaximo">Numero maximo</Label>
                            <Input type="number" id="numeroMaximo" name="numeroMaximo"
                                value={values.numeroMaximo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.numeroMaximo && errors.numeroMaximo) ? (<Alert color="danger">{errors.fechaMaxima}</Alert>) : null}
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="precioBrutoMinimo">Precio bruto minimo</Label>
                            <Input type="number" id="precioBrutoMinimo" name="precioBrutoMinimo"
                                value={values.precioBrutoMinimo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.precioBrutoMinimo && errors.precioBrutoMinimo) ? (<Alert color="danger">{errors.precioBrutoMinimo}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="precioBrutoMaximo">Precio bruto maximo</Label>
                            <Input type="number" id="precioBrutoMaximo" name="precioBrutoMaximo"
                                value={values.precioBrutoMaximo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.precioBrutoMaximo && errors.precioBrutoMaximo) ? (<Alert color="danger">{errors.precioBrutoMaximo}</Alert>) : null}
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="horaMinima">Hora minima</Label>
                            <Input type="time" id="horaMinima" name="horaMinima"
                                value={values.horaMinima}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.horaMinima && errors.horaMinima) ? (<Alert color="danger">{errors.horaMinima}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="horaMaxima">Hora maxima</Label>
                            <Input type="time" id="horaMaxima" name="horaMaxima"
                                value={values.horaMaxima}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.horaMaxima && errors.horaMaxima) ? (<Alert color="danger">{errors.horaMaxima}</Alert>) : null}
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="puntosMinimos">Puntos minimos</Label>
                            <Input type="number" id="puntosMinimos" name="puntosMinimos"
                                value={values.puntosMinimos}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.puntosMinimos && errors.puntosMinimos) ? (<Alert color="danger">{errors.puntosMinimos}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="puntosMaximos">Puntos maximos</Label>
                            <Input type="number" id="puntosMaximos" name="puntosMaximos"
                                value={values.puntosMaximos}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.puntosMaximos && errors.puntosMaximos) ? (<Alert color="danger">{errors.puntosMaximos}</Alert>) : null}
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="direccion">Direccion</Label>
                            <Input type="number" id="direccion" name="direccion"
                                value={values.direccion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
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
                        <FormGroup className='col-12 col-sm-6'>
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
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="tipoCliente">Tipo de cliente</Label>
                            <Input type="select" id="tipoCliente" name="tipoCliente"
                                value={values.tipoCliente}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>sin especificar</option>
                                <option>empresarial</option>
                                <option>comun</option>
                            </Input>
                            {(touched.tipoCliente && errors.tipoCliente) ? (<Alert color="danger">{errors.tipoCliente}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-12 col-sm-6'>
                            <Label htmlFor="nota">Nota</Label>
                            <Input type="textarea" id="nota" name="nota"
                                value={values.nota}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.nota && errors.nota) ? (<Alert color="danger">{errors.nota}</Alert>) : null}
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <br></br>
                        <div class="d-flex justify-content-center" >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Buscar</Button>
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                        </div>
                    </FormGroup>
                </CardBody>
            </Form>
        </div>
    );
}


const RenderSearchResultTuple = (props) => {
    const orderData = props.order;

    return (
        <OrderRow order={orderData} />

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
        const ResultTuples = result.data.map((order) => {
            return (

                <RenderSearchResultTuple order={order} key={order.fecha + order.numero}></RenderSearchResultTuple>

            );
        })

        return (
            <Table className='col' responsive={true} bordered striped>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Numero</th>
                        <th>Hora de registro</th>
                        <th>Direccion</th>
                        <th>Precio bruto</th>
                        <th>Precio Final</th>
                        <th>Estado</th>
                        <th>Bodega</th>
                        <th>Puntos</th>
                        <th>Tipo de cliente</th>
                        <th>Nota</th>
                        <th>Registrado por</th>
                        <th>Cliente</th>
                        <th>Empleado encargado</th>
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
            <Card  >
                <CardBody>
                    <SearchCriteria></SearchCriteria>
                </CardBody>
            </Card>
            <Card>
                <CardTitle>
                    <CardText>Pedidos</CardText>
                </CardTitle>
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