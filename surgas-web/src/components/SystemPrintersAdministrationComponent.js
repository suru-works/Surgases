import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { users, searchUser } from '../redux/ActionCreators';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useFormik } from "formik";
import * as yup from "yup";


/* TO DO: implementar la gestion de impresoras */


const SystemPrintersAdministration = () => {


    return (
        <Card className='col-9 '>
                <CardTitle>
                    <CardText>Impresoras del sistema</CardText>
                </CardTitle>
                <CardBody>
                    
                </CardBody>
            </Card>
    );
}


SystemPrintersAdministration.propTypes = {};

export default SystemPrintersAdministration;