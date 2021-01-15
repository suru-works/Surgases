import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import SetClient from './OrderSetClientComponent';
import CreateClientData from './OrderCreateClientDataComponent';
import UpdateClientData from './OrderUpdateClientDataComponent';

const Trolly = (props) => {
    const validationSchema = yup.object(

        {
        }
    );

    const orderClientError = useSelector(state => state.orderClient.errMess);
    const orderClientResult = useSelector(state => state.orderClient.result);
    const orderClientLoading = useSelector(state => state.orderClient.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        let clientData = [];
        clientData.push('telefono=' + props.telefono);
        dispatch(orderClient(clientData));
    }, []);

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
        },
        validationSchema,
        onSubmit(values) {
            props.submit();
        }
    });
    if (orderClientLoading) {
        return (
            <Loading />
        );

    }
    if (orderClientError) {

        return (
            <div class="d-flex justify-content-center" >
                hubo un error
                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cerrar</Button>

            </div>
        );

    }
    if (orderClientResult) {
        return (
            <div className="container"> 

                <div className="row"> 

                    <div className="col-6"> 

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>
                            <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                                carrito1
                            <br></br>
                                <div class="d-flex justify-content-center" >
                                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={props.goBack}>Atras</Button>
                                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Registrar pedido</Button>
                                </div>
                            </FormGroup>
                        </Form>

                    </div>

                    <div className="col-6"> 

                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>
                            
                            <a>ALGUIEN MATEME POR FAVOR</a>
                                
                        </Form>

                    </div>

                </div>
            </div>

        );
    }
}

Trolly.propTypes = {};
export default Trolly;