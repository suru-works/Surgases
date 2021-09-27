import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from "formik";
import * as yup from "yup";

import { printOrder, getPrintOrderPrinters, getPrintOrderPrintersReset } from '../redux/ActionCreators';



const ModalForm = (props) => {
    const [selectedPrinter, setselectedPrinter] = useState(props.printers[0].codigo);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        props.toogleAndReset()
    }

    const print = () => {
        dispatch(printOrder({ fecha: props.order.fecha, numero: props.order.numero, impresora: selectedPrinter }));
    }

    return (

        <Card>
            <CardTitle>
                <CardText>Selecciona la impresora:</CardText>
            </CardTitle>
            <CardBody>
                <div className='col-xs-12 col-lg-8 col-xl-6  align-self-end'>
                    <Label htmlFort="printer">Impresora</Label>
                    <Input type="select" id="printer" name="printer"
                        value={selectedPrinter}
                        disabled>
                    </Input>
                </div>
                <div className='col-xs-12 col-lg-12 col-xl-12'>
                    <Label htmlFort="printer">Descripcion de la impresora</Label>
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


const PrintOrderModal = (props) => {

    const GetPrintOrderPrintersResult = useSelector(state => state.printOrderPrinters.result);
    const GetPrintOrderPrintersLoading = useSelector(state => state.printOrderPrinters.loading);
    const GetPrintOrderPrintersError = useSelector(state => state.printOrderPrinters.error);

    const dispatch = useDispatch();

    useEffect(() => {
        let printerData = [];
        dispatch(getPrintOrderPrinters(printerData));
    }, []);


    const toogleAndReset = () => {
        dispatch(getPrintOrderPrintersReset());
        props.toggle();
    }
    

    const options = () => {
        if(GetPrintOrderPrintersError){
            return(
                <Label>Ha ocurrido un error.</Label>
            );
        }
        else if (GetPrintOrderPrintersResult) {
            return(
                <ModalForm order = {props.order} toogleAndReset = {toogleAndReset} printers = {GetPrintOrderPrintersResult.data}></ModalForm>
            );
        } else {
            return(
                <Loading/>
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