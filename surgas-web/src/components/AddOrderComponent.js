import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset,clients, updateClient, clientsUpdateReset, addClient, orderClient,oderClientReset,clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";

const SetClient = (props) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = yup.object(

        {
            telefono: yup
                .string()
                .required("Ingresa un telefono")
                .matches(phoneRegExp, 'Esto no es un telefono valido')
                .min(7, "muy corto")
                .max(15, "muy largo"),
        }
    );
    const dispatch = useDispatch();
    const error = useSelector(state => state.orderClient.errMess);
    const result = useSelector(state => state.orderClient.result);
    const loading = useSelector(state => state.orderClient.isLoading);
    const getClientInfo = (clientData) => dispatch(orderClient(clientData));
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: ''
        },
        validationSchema,
        onSubmit(values) {
            let clientData = []
            if (values.telefono != '') {
                clientData.push('telefono=' + values.telefono);
                getClientInfo(clientData);
            }
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
        if (result.data.length > 0) {
            props.goToUpdateClientData();
        }
        else {
            props.goToCreateClientData();
        }
        return (
            <div></div>
        );
    }
    return (
        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>

            <div className='row d-flex justify-content-center '>
                <FormGroup >
                    <Label htmlFor="telefono">telefono</Label>
                    <Input type="phone" id="telefono" name="telefono"
                        value={values.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                </FormGroup>
                <FormGroup>
                    cliente
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

const CreateClientData = (props) => {
    const validationSchema = yup.object(

        {
            telefono: yup
                .string()
                .required("El cliente debe tener teléfono"),

            email: yup
                .string()
                .email()
                .required("El cliente debe tener correo"),

            nombre: yup
                .string()
                .required("El cliente debe tener nombre"),

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
            telefono: '',
            email: '',
            nombre: '',
            tipo: ''
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

const UpdateClientData = (props) => {
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
                datos del cliente
                <br></br>
                <div class="d-flex justify-content-center" >
                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={props.goBack}>Atras</Button>
                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Actualizar datos y continuar</Button>
                </div>
            </FormGroup>
        </Form>
    );
}

const Trolly = (props) => {
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
                carrito
                <br></br>
                <div class="d-flex justify-content-center" >
                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={props.goBack}>Atras</Button>
                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Registrar pedido</Button>
                </div>
            </FormGroup>
        </Form>
    );
}

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

const AddOrderComponent = (props) => {
    const [setClientModal, setSetClientModal] = useState(true);
    const [createClientDataModal, setCreateClientDataModal] = useState(false);
    const [updateClientDataModal, setUpdateClientDataModal] = useState(false);
    const [trollyModal, setTrollyDataModal] = useState(false);
    const [printModal, setPrintDataModal] = useState(false);

    const userResult = useSelector(state => state.user.result);

    const dispatch = useDispatch();


    const goToSetClient = () => {
        setSetClientModal(true);
        setCreateClientDataModal(false);
        setUpdateClientDataModal(false);
        setTrollyDataModal(false);
        setPrintDataModal(false);
    }

    const goToCreateClientData = () => {
        setSetClientModal(false);
        setCreateClientDataModal(true);
        setUpdateClientDataModal(false);
        setTrollyDataModal(false);
        setPrintDataModal(false);
    }

    const goToUpdateClientData = () => {
        setSetClientModal(false);
        setCreateClientDataModal(false);
        setUpdateClientDataModal(true);
        setTrollyDataModal(false);
        setPrintDataModal(false);
    }

    const goToTrollyData = () => {
        setSetClientModal(false);
        setCreateClientDataModal(false);
        setUpdateClientDataModal(false);
        setTrollyDataModal(true);
        setPrintDataModal(false);
    }

    const goToPrintData = () => {
        setSetClientModal(false);
        setCreateClientDataModal(false);
        setUpdateClientDataModal(false);
        setTrollyDataModal(false);
        setPrintDataModal(true);
    }

    useEffect(() => {
        if (userResult) {
            if (userResult.data.tipo === 'cliente') {
                goToSetClient();
            }
        }
    }, []);

    const toggleAndReset = () => {
        dispatch(clientsUpdateReset());
        dispatch(oderClientReset());
        goToSetClient();
        props.toggle();
    }

    const options = () => {
        if (setClientModal) {
            return (
                <SetClient goBack={toggleAndReset} goToUpdateClientData={goToUpdateClientData} goToCreateClientData={goToCreateClientData}></SetClient>
            );
        }
        if (createClientDataModal) {
            return (
                <CreateClientData goBack={goToSetClient} submit={goToTrollyData}></CreateClientData>
            );
        }
        if (updateClientDataModal) {
            return (
                <UpdateClientData goBack={goToSetClient} submit={goToTrollyData}></UpdateClientData>
            );
        }
        if (trollyModal) {
            return (
                <Trolly goBack={goToUpdateClientData} submit={goToPrintData}></Trolly>
            );
        }
        if (printModal) {
            return (
                <Print goBack={toggleAndReset} submit={goToUpdateClientData}></Print>
            );
        }
    }
    return (
        <Modal className="modal-lg" isOpen={props.isOpen} toggle={toggleAndReset}>

            <ModalHeader toggle={toggleAndReset}>Añadir un pedido</ModalHeader>

            <ModalBody>

                {options()}

            </ModalBody>
        </Modal>
    );

}
AddOrderComponent.propTypes = {};

export default AddOrderComponent;