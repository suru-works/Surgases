import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { users, searchUser } from '../redux/ActionCreators';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useFormik } from "formik";
import * as yup from "yup";


/* TO DO: realizar validaciones de los parametos */
const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);

const SystemParametersAdministration = () => {


    return (
        <Card className='col-9 '>
                <CardTitle>
                    <CardText>Parametros del sistema</CardText>
                </CardTitle>
                <CardBody>
                    
                </CardBody>
            </Card>
    );
}


SystemParametersAdministration.propTypes = {};

export default SystemParametersAdministration;