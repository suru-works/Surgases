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
import AddUserComponent from './AddUserComponent';

const validationSchema = yup.object(

    {
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
            estado: '',
            bodega: '',
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
                            <Label htmlFor="nombre">Fecha minima</Label>
                            
                        </FormGroup>
                    </div>
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
            <Table className='col' responsive bordered striped>
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
            <AddUserComponent isOpen={isAddOrderModalOPen} toggle={toggleAddOrderModal}></AddUserComponent>
        </div>
    );
}


OrdersAdministration.propTypes = {};

export default OrdersAdministration;