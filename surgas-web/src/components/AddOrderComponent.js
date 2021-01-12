import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        username: yup
            .string()
            .required("Ingrese su usuario")
            .min(2, "El usuario debe ser de mínimo 2 caracteres")
            .max(30, "El usuario debe ser de máximo 30 caracteres"),

        nombre: yup
            .string()
            .required("Ingrese su nombre")
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres")
    }
);


const SetClient = () => {
    return (
        <div>
            puto el cliente que lo lea
        </div>
    );
}

const UpdateClientData = () => {
    return (
        <div>
            puto el cliente que lo lea
        </div>
    );
}

const Trolly = () => {
    return (
        <div>
            puto el cliente que lo lea
        </div>
    );
}

const Print = () => {
    return (
        <div>
            puto el cliente que lo lea
        </div>
    );
}

const AddOrderComponent = (props) => {
    const [setClientModal, setSetClientModal] = useState(true);
    const [updateClientDataModal, setUpdateClientDataModal] = useState(false);
    const [trollyModal, setTrollyDataModal] = useState(false);
    const [printModal, setPrintDataModal] = useState(false);

    const userResult = useSelector(state => state.user.result);

    useEffect(() => {
        if (userResult) {
            if (userResult.data.tipo === 'cliente') {
                setClientModal(false);
                setUpdateClientDataModal(true);
            }
        }
    }, []);

    const toggleAndReset = () => {
        props.toggle();
    }

    const options = () => {
        if (setClientModal) {
            return (
                <SetClient></SetClient>
            );
        }
        if (updateClientDataModal) {
            return (
                <UpdateClientData></UpdateClientData>
            );
        }
        if (trollyModal) {
            return (
                <Trolly></Trolly>
            );
        }
        if (printModal) {
            return (
                <Print></Print>
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