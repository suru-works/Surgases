import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese, printOrder } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import SetClient from './OrderSetClientComponent';
import CreateClientData from './OrderCreateClientDataComponent';
import UpdateClientData from './OrderUpdateClientDataComponent';
import Trolly from './TrollyComponent';
import PrintOrderModal from './PrintOrderModal';

const Print = (props) => {
    const [isPrintOrderModalOpen,setIsPrintOrderModalOpen] = useState(false);
    const togglePrintOrderModal = () => {
        if (isPrintOrderModalOpen) {
            setIsPrintOrderModalOpen(false);
        }
        else{
            setIsPrintOrderModalOpen(true);
        }
    }
    return (
            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                imprimir el pedido? (los puntos y el stock de productos no se veran afectados a menos de que el pedido cambie a estado pagado o fiado)
                <br></br>
                <div class="d-flex justify-content-center" >
                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={props.goBack}>No</Button>
                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  onClick={togglePrintOrderModal}>Imprimir</Button>
                    <PrintOrderModal isOpen={isPrintOrderModalOpen} toggle={togglePrintOrderModal} order={props.order}></PrintOrderModal>
                </div>
            </div>
    );
}

Print.propTypes = {};
export default Print;