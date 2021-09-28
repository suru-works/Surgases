import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { printers, updatePrinter, deletePrinter, printersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    {
        descripcion: yup
            .string()
    });
const EditPrinterComponent = (props) => {
    const [codigo] = useState(props.printer.codigo);
    const [descripcion] = useState(props.printer.descripcion);

    const error = useSelector(state => state.printersUpdate.errMess);
    const result = useSelector(state => state.printersUpdate.result);
    const loading = useSelector(state => state.printersUpdate.isLoading);



    const dispatch = useDispatch();

    const toggleAndReset = () => {
        dispatch(printers());
        dispatch(printersUpdateReset());
        props.toggle();
    }

    const doUpdatePrinter = (printerData) => dispatch(updatePrinter(printerData));

    const uploadChanges = (values) => {
        const printerData = {
            codigo: props.printer.codigo,
            descripcion: values.descripcion
        }
        doUpdatePrinter(printerData);
    }

    const doDeletePrinter = (printerData) => dispatch(deletePrinter(printerData));

    const deleteThatPrinter = () => {
        const printerData = {
            codigo: props.printer.codigo
        }
        doDeletePrinter(printerData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            descripcion: descripcion
        },
        validationSchema,
        onSubmit(values) {
            const printerData = {
                descripcion: values.descripcion
            }
            uploadChanges(printerData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Editar una impresora</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Editar una impresora</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Editar una impresora</ModalHeader>
                <ModalBody>
                    <p>Impresora editada correctamente.</p>
                </ModalBody>
                <Button onClick={toggleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toggleAndReset}>Editar una impresora</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos de la impresora: {codigo}</CardTitle>
                                <CardBody style={{ padding: 8 }}>

                                    <FormGroup>
                                        <Label htmlFor="descripcion">Descripcion</Label>
                                        <Input type="text" id="descripcion" name="descripcion" value={values.descripcion}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.descripcion && errors.descripcion) ? (<Alert color="danger">{errors.descripcion}</Alert>) : null}

                                    </FormGroup>

                                    <div class="d-flex justify-content-center" >
                                        <FormGroup>

                                            <div className="d-flex justify-content-center" >

                                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type="submit" value="submit"  >Actualizar</Button>
                                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary" onClick={() => deleteThatPrinter()}  >Eliminar Impresora</Button>
                                            </div>
                                        </FormGroup>

                                    </div>

                                </CardBody>

                            </Card>

                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }

}
EditPrinterComponent.propTypes = {};

export default EditPrinterComponent;