import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import SetClient from './OrderSetClientComponent';
import CreateClientData from './OrderCreateClientDataComponent';
import UpdateClientData from './OrderUpdateClientDataComponent';
import Trolly from './TrollyComponent';
import Print from './PrintComponent';

const AddOrderComponent = (props) => {
    const [setClientModal, setSetClientModal] = useState(true);
    const [createClientDataModal, setCreateClientDataModal] = useState(false);
    const [updateClientDataModal, setUpdateClientDataModal] = useState(false);
    const [trollyModal, setTrollyDataModal] = useState(false);
    const [printModal, setPrintDataModal] = useState(false);

    const [orderUserTel, setOrderUserTel] = useState('');

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
        setOrderUserTel('');
        dispatch(clientsUpdateReset());
        dispatch(orderClientReset());
        goToSetClient();
        props.toggle();
    }

    const SetClientGoBack = () => {
        toggleAndReset();
    }
    const SetClientSubmit = () => {

    }

    const CreateClientDataGoBack = () => {
        setOrderUserTel('');
        dispatch(orderClientReset());
        goToSetClient();
    }
    const CreateClientDataSubmit = (telefono) => {
        setOrderUserTel(telefono);
        goToTrollyData();
    }

    const UpdateClientDataGoBack = () => {
        setOrderUserTel('');
        dispatch(orderClientReset());
        goToSetClient();
    }
    const UpdateClientDataSubmit = (telefono) => {
        setOrderUserTel(telefono);
        dispatch(clientsUpdateReset());
        goToTrollyData();
    }

    const TrollyGoBack = () => {
        goToUpdateClientData();
    }
    const TrollySubmit = () => {

    }

    const PrintGoBack = () => {
        goToSetClient();
    }
    const PrintSubmit = () => {

    }

    const options = () => {
        if (setClientModal) {
            return (
                <SetClient goBack={SetClientGoBack} goToUpdateClientData={goToUpdateClientData} goToCreateClientData={goToCreateClientData} setOrderUserTel={setOrderUserTel}></SetClient>
            );
        }
        if (createClientDataModal) {
            return (
                <CreateClientData goBack={CreateClientDataGoBack} submit={CreateClientDataSubmit} telefono={orderUserTel}></CreateClientData>
            );
        }
        if (updateClientDataModal) {
            return (
                <UpdateClientData goBack={UpdateClientDataGoBack} submit={UpdateClientDataSubmit}></UpdateClientData>
            );
        }
        if (trollyModal) {
            return (
                <Trolly goBack={TrollyGoBack} submit={goToPrintData} telefono={orderUserTel}></Trolly>
            );
        }
        if (printModal) {
            return (
                <Print goBack={PrintGoBack} submit={goToUpdateClientData}></Print>
            );
        }
    }
    return (
        <Modal className="modal-xl" isOpen={props.isOpen} toggle={toggleAndReset}>

            <ModalHeader toggle={toggleAndReset}>Añadir un pedido</ModalHeader>

            <ModalBody>

                {options()}

            </ModalBody>
        </Modal>
    );

}
AddOrderComponent.propTypes = {};

export default AddOrderComponent;