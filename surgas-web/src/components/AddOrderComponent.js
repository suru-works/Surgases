import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const SetClient = (props) => {

    const validationSchema = yup.object(

        {
            telefono: yup
            .string()
            .required("Ingresa un telefono")
        }
    );

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            telefono: ''
        },
        validationSchema,
        onSubmit(values) {
            console.log(values);
            props.submit();
        }
    });
    return (
        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>

            <div className='row d-flex justify-content-center '>
                <FormGroup >
                    <Label htmlFor="telefono">telefono</Label>
                    <Input type="text" id="telefono" name="telefono"
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
    const [updateClientDataModal, setUpdateClientDataModal] = useState(false);
    const [trollyModal, setTrollyDataModal] = useState(false);
    const [printModal, setPrintDataModal] = useState(false);

    const userResult = useSelector(state => state.user.result);



    const goTosetClient = () => {
        setSetClientModal(true);
        setUpdateClientDataModal(false);
        setTrollyDataModal(false);
        setPrintDataModal(false);
    }

    const goToUpdateClientData = () => {
        setSetClientModal(false);
        setUpdateClientDataModal(true);
        setTrollyDataModal(false);
        setPrintDataModal(false);
    }

    const goToTrollyData = () => {
        setSetClientModal(false);
        setUpdateClientDataModal(false);
        setTrollyDataModal(true);
        setPrintDataModal(false);
    }

    const goToPrintData = () => {
        setSetClientModal(false);
        setUpdateClientDataModal(false);
        setTrollyDataModal(false);
        setPrintDataModal(true);
    }

    /* useEffect(() => {
        if (userResult) {
            if (userResult.data.tipo === 'cliente') {
                goTosetClient();
            }
        }
    }, []); */

    const toggleAndReset = () => {
        props.toggle();
    }

    const options = () => {
        if (setClientModal) {
            return (
                <SetClient goBack={toggleAndReset} submit={goToUpdateClientData}></SetClient>
            );
        }
        if (updateClientDataModal) {
            return (
                <UpdateClientData goBack={goTosetClient} submit={goToTrollyData}></UpdateClientData>
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