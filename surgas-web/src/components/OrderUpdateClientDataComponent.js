import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import SetClient from './OrderSetClientComponent';
import CreateClientData from './OrderCreateClientDataComponent';

const UpdateClientData = (props) => {
    const validationSchema = yup.object(

        {
            telefono: yup
                .string()
                .required("El cliente debe tener teléfono"),

            email: yup
                .string()
                .email()
                .nullable(),

            nombre: yup
                .string(),

            tipo: yup
                .string()
                .required("El cliente debe tener tipo")
        }
    );

    const orderUserResult = useSelector(state => state.orderClient.result);

    const error = useSelector(state => state.clientsUpdate.errMess);
    const result = useSelector(state => state.clientsUpdate.result);
    const loading = useSelector(state => state.clientsUpdate.isLoading);

    const dispatch = useDispatch();
    const doUpdateClient = (clientData) => dispatch(updateClient(clientData));

    const uploadChanges = (values) => {

        const clientData = {

            telefono: values.telefono,
            email: values.email,
            nombre: values.nombre,
            tipo: values.tipo,
            puntos: values.puntos,
            descuento: values.descuento

        }

        doUpdateClient(clientData);
    }
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: orderUserResult.data[0].telefono,
            email: orderUserResult.data[0].email,
            nombre: orderUserResult.data[0].nombre,
            tipo: orderUserResult.data[0].tipo,
            fecha_registro: orderUserResult.data[0].fecha_registro,
            puntos: orderUserResult.data[0].puntos,
            descuento: orderUserResult.data[0].descuento,
            numero_pedidos: orderUserResult.data[0].numero_pedidos,
            promotor: orderUserResult.data[0].promotor
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
        props.submit(orderUserResult.data[0].telefono);
        return (
            <div></div>
        );
    }
    return (
        <Form onSubmit={handleSubmit} >

            <CardTitle tag="h5"> Verifica los datos del cliente</CardTitle>

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
                        <option>natural</option>
                        <option>juridica</option>
                    </Input>
                    {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                </FormGroup>

            </div>
            <div className="row">

                <FormGroup className='col-12 col-sm-6'>
                    <Label htmlFor="fecha_registro">Fecha de registro</Label>
                    <Input
                        type="text"
                        id="fecha_registro"
                        name="fecha_registro"
                        value={values.fecha_registro}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled    
                    />
                    {(touched.fecha_registro && errors.fecha_registro) ? (<Alert color="danger">{errors.fecha_registro}</Alert>) : null}
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
                        disabled>
                    </Input>
                    {(touched.puntos && errors.puntos) ? (<Alert color="danger">{errors.puntos}</Alert>) : null}
                </FormGroup>

            </div>

            <div className="row">

                <FormGroup className='col-12 col-sm-6'>
                    <Label htmlFor="numero_pedidos">Numero de pedidos</Label>
                    <Input
                        type="number"
                        id="numero_pedidos"
                        name="numero_pedidos"
                        value={values.numero_pedidos}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    >
                    </Input>
                    {(touched.numero_pedidos && errors.numero_pedidos) ? (<Alert color="danger">{errors.numero_pedidos}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-12 col-sm-6'>
                    <Label htmlFor="promotor">Promotor</Label>
                    <Input
                        type="text"
                        id="promotor"
                        name="promotor"
                        value={values.promotor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    >
                    </Input>
                    {(touched.promotor && errors.promotor) ? (<Alert color="danger">{errors.promotor}</Alert>) : null}
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

UpdateClientData.propTypes = {};
export default UpdateClientData;