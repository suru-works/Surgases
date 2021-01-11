import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        username: yup
            .string()
            .required("Ingrese su usuario")
            .min(2, "El usuario debe ser de mínimo 2 caracteres")
            .max(30, "El usuario debe ser de máximo 30 caracteres"),

        nombre: yup
            .string()
            .required("Ingrese su nombre")
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
    }
);

const AddOrderComponent = (props) => {
    const error = useSelector(state => state.ordersUpdate.errMess);
    const result = useSelector(state => state.ordersUpdate.result);
    const loading = useSelector(state => state.ordersUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(orders());
        dispatch(ordersUpdateReset());
        props.toggle();
    }

    const doAddOrder = (orderData) => dispatch(addOrder(orderData));

    const uploadChanges = (values) => {
        const orderData = {
            username: values.username,
            nombre: values.nombre,
            password: values.pasword,
            email: values.email,
            administrador: values.administrador,
            vendedor: values.vendedor
        }
        doAddOrder(orderData);        
    }
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            username:'',
            nombre: '', 
            password: '',
            email: '',
            administrador: '0',
            vendedor: '1'
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
                <ModalHeader toggle={toogleAndReset}>Añadir un Pedido</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Añadir un Pedido</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un Pedido</ModalHeader>
                <ModalBody>
                    <p>Pedido añadido correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            
            <Modal isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Añadir un Pedido</ModalHeader>

                <ModalBody>

                        <Form onSubmit={handleSubmit} >

                            <CardTitle> Ingresa los datos del Pedido</CardTitle>
                            <br></br>

                            
                            <br></br>

                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} type="submit" value="submit"  >Añadir</Button>
                            </div>

                        </Form>

                </ModalBody>
            </Modal>

        );
    }

}
AddOrderComponent.propTypes = {};

export default AddOrderComponent;