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
import Trolly from './TrollyComponent';

const Print = (props) => {
    const validationSchema = yup.object(

        {
        }
    );
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
        },
        validationSchema,
        onSubmit(values) {
            props.submit();
        }
    });
    return (
        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>
            <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                imprimir
                <br></br>
                <div class="d-flex justify-content-center" >
                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={props.goBack}>No</Button>
                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Imprimir</Button>
                </div>
            </FormGroup>
        </Form>
    );
}

Print.propTypes = {};
export default Print;