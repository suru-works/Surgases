import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { printers, addPrinter, printersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        descripcion: yup
            .string()
    }
);

const AddUserComponent = (props) => {
    const error = useSelector(state => state.printersUpdate.errMess);
    const result = useSelector(state => state.printersUpdate.result);
    const loading = useSelector(state => state.printersUpdate.isLoading);

    

    const dispatch = useDispatch();

    const toggleAndReset = () => {
        dispatch(printers());
        dispatch(printersUpdateReset());
        props.toggle();
    }

    const doAddPrinter = (printerData) => {
        dispatch(addPrinter(printerData));
    }

    const uploadChanges =  (values) => {
        const printerData = {
            descripcion: values.descripcion
        }
        doAddPrinter(printerData);        
    }
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            descripcion:'',
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
            resetForm();
        }
    });


    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Añadir una impresora</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toggleAndReset}>Añadir una impresora</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Añadir una impresora</ModalHeader>
                <ModalBody>
                    <p>Impresora añadida correctamente.</p>
                </ModalBody>
                <Button onClick={toggleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            
            <Modal isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toggleAndReset}>Añadir una impresora</ModalHeader>

                <ModalBody>

                        <Form onSubmit={handleSubmit} >

                            <CardTitle> Ingresa los datos de la impresora</CardTitle>
                            <br></br>

                            <FormGroup>
                                
                                <Label htmlFor="descripcion">Descripcion</Label>
                                <Input type="text" id="descripcion" name="descripcion" value={values.descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {(touched.descripcion && errors.descripcion) ? (<Alert color="danger">{errors.descripcion}</Alert>) : null}

                            </FormGroup>                            

                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} type="submit" value="submit"  >Añadir</Button>
                            </div>

                        </Form>

                </ModalBody>
            </Modal>

        );
    }

}
AddUserComponent.propTypes = {};

export default AddUserComponent;