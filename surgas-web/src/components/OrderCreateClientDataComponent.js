import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import SetClient from './OrderSetClientComponent';

const CreateClientData = (props) => {
    const validationSchema = yup.object(

        {
            telefono: yup
                .string()
                .required("El cliente debe tener teléfono"),

            email: yup
                .string()
                .email(),

            nombre: yup
                .string(),

            tipo: yup
                .string()
                .required("El cliente debe tener tipo")
        }
    );
    const error = useSelector(state => state.clientsUpdate.errMess);
    const result = useSelector(state => state.clientsUpdate.result);
    const loading = useSelector(state => state.clientsUpdate.isLoading);

    const dispatch = useDispatch();
    const doAddClient = (clientData) => dispatch(addClient(clientData));

    const uploadChanges = (values) => {

        const hoy = new Date();
        const mes = hoy.getMonth() + 1;

        const clientData = {

            telefono: values.telefono,
            email: values.email,
            nombre: values.nombre,
            fecha_registro: hoy.getFullYear() + '-' + ((mes > 9 ? '' : '0') + mes) + '-' + hoy.getDate(),
            tipo: values.tipo

        }

        doAddClient(clientData);
    }
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: props.telefono,
            email: '',
            nombre: '',
            tipo: 'comun'
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
            resetForm();
        }
    });
    if (loading) {
        return (
            <Loading />
        );

    }
    if (error) {

        return (
            <div class="d-flex justify-content-center" >
                hubo un error
                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cerrar</Button>

            </div>
        );

    }
    if (result) {
        props.submit();
        return (
            <div></div>
        );
    }
    return (
        <Form onSubmit={handleSubmit} >

            <CardTitle> Ingresa los datos del cliente</CardTitle>

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
                        disabled
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

            <div className="row">

                <FormGroup className='col-12 col-sm-6'>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="text"
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
                        type="select"
                        id="tipo"
                        name="tipo"
                        value={values.tipo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option>comun</option>
                        <option>empresarial</option>
                    </Input>
                    {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                </FormGroup>

            </div>

            <div className="row">

                <FormGroup className='col-12 col-sm-6'>
                    <br></br>
                    <div class="d-flex justify-content-center" >
                        <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Siguiente</Button>
                        <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cancelar</Button>

                    </div>
                </FormGroup>

            </div>

        </Form>
    );
}

CreateClientData.propTypes = {};
export default CreateClientData;