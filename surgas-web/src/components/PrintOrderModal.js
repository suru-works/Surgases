import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from "formik";
import * as yup from "yup";

import { printOrder, getPrintOrderPrinters, getPrintOrderPrintersReset, printOrderReset } from '../redux/ActionCreators';



const ModalForm = (props) => {
    const [selectedPrinter, setSelectedPrinter] = useState(props.printers[0].codigo);
    const [printerDescription, ] = useState(props.printers[0].descripcion);
    const [printings, setPrintings ] = useState(1);

    const PrintOrderResult = useSelector(state => state.printOrder.result);
    const PrintOrderLoading = useSelector(state => state.printOrder.loading);
    const PrintOrderError = useSelector(state => state.printOrder.error);


    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(printOrderReset());
        props.toogleAndReset()
    }

    const print = () => {
        dispatch(printOrder({ fecha: props.order.fecha, numero: props.order.numero, impresora: selectedPrinter }, printings));
    }

    const returnToPrint = () => {
        dispatch(printOrderReset());
    }

    const printers = props.printers.map((printer) => {
        return (
            <option key={printer.codigo}>
                {printer.codigo}
            </option>
        );
    });

    const options = () => {
        if (PrintOrderLoading) {
            return (
                <Card>
                    <CardTitle>
                        <CardText>Procesando</CardText>
                    </CardTitle>
                    <CardBody>
                        <Loading></Loading>
                    </CardBody>
                </Card>
            );
        }
        else if (PrintOrderError) {
            return (
                <Card>
                    <CardTitle>
                        <CardText>Error</CardText>
                    </CardTitle>
                    <CardBody>
                        <Label> Ocurrio un error.s</Label>
                    </CardBody>
                </Card>
            );
        } else if (PrintOrderResult) {
            return (
                <Card>
                    <CardTitle>
                        <CardText>Exito</CardText>
                    </CardTitle>
                    <CardBody>
                        <div className='col-xs-12 col-lg-12 col-xl-12'>
                            <Label> Pedido imprimido corectamente.</Label>
                            <div className='col-xs-12 col-lg-12 col-xl-12'>
                                <div class="d-flex justify-content-around"  >
                                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={() => toogleAndReset()}>Cerrar</Button>
                                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" onClick={() => returnToPrint()} >Regresar</Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <Card>
                    <CardTitle>
                        <CardText>Selecciona una impresora</CardText>
                    </CardTitle>
                    <CardBody>
                        <div className='col-xs-12 col-lg-8 col-xl-6  align-self-end'>
                            <Label htmlFort="printer">Impresora</Label>
                            <Input type="select" id="printer" name="printer"
                                value={selectedPrinter} 
                                onChange={(event) => { setSelectedPrinter(event.target.value) }}>
                                {printers}
                            </Input>
                            <Label htmlFort="printings">Cantidad de impresiones</Label>
                            <Input type="select" id="printings" name="printings"
                                value={printings} 
                                onChange={(event) => { setPrintings(event.target.value) }}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </div>
                        <div className='col-xs-12 col-lg-12 col-xl-12'>
                            <Label htmlFort="printerDescription">Descripcion de la impresora</Label>
                            <Input type="textarea" id="printerDescription" name="printerDescription"
                                value={printerDescription}
                                disabled
                            />
                        </div>
                        <div className='col-xs-12 col-lg-12 col-xl-12'>
                            <div class="d-flex justify-content-around"  >
                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={() => toogleAndReset()}>Cancelar</Button>
                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" onClick={() => print()} >Imprimir pedido</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
        }
    }


    return (
        options()
    );
}


const PrintOrderModal = (props) => {

    const GetPrintOrderPrintersResult = useSelector(state => state.printOrderPrinters.result);
    const GetPrintOrderPrintersLoading = useSelector(state => state.printOrderPrinters.loading);
    const GetPrintOrderPrintersError = useSelector(state => state.printOrderPrinters.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isOpen) {
            let printerData = [];
            dispatch(getPrintOrderPrinters(printerData));
        }
    }, [props.isOpen]);


    const toogleAndReset = () => {
        dispatch(getPrintOrderPrintersReset());
        props.toggle();
    }


    const options = () => {
        if (GetPrintOrderPrintersError) {
            return (
                <Label>Ha ocurrido un error.</Label>
            );
        }
        else if (GetPrintOrderPrintersResult) {
            return (
                <ModalForm order={props.order} toogleAndReset={toogleAndReset} printers={GetPrintOrderPrintersResult.data}></ModalForm>
            );
        } else {
            return (
                <Loading />
            );
        }
    }

    return (
        <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
            <ModalHeader toggle={toogleAndReset}>Imprimir un pedido</ModalHeader>
            <ModalBody>
                {options()}
            </ModalBody>
        </Modal>
    );
};

PrintOrderModal.propTypes = {};

export default PrintOrderModal;