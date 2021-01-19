import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
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

    const [newTelefono, setNewTelefono] = useState('');

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
            let clientData = [];
            if (values.telefono != '') {
                clientData.push('telefono=' + values.telefono);
                setNewTelefono(values.telefono);
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
            props.setOrderUserTel(newTelefono);
            props.goToCreateClientData();
        }
        return (
            <div></div>
        );
    }
    return (
        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}>

            <div className='row d-flex justify-content-center '>

                <div className='col-lg-4 d-none d-lg-block d-xl-none'>
                    
                </div>

                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4 '>

                    <FormGroup >
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input type="phone" id="telefono" name="telefono"
                            value={values.telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                    </FormGroup>

                </div>

                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4 '>

                    <FormGroup>
                        <br></br>

                        <div class="d-flex justify-content-center" >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Siguiente</Button>
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cancelar</Button>

                        </div>
                    </FormGroup>

                </div>

            </div>

        </Form>
    );
}

SetClient.propTypes = {};
export default SetClient;