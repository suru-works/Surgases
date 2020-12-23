import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import Dropzone from './DropzoneComponent';
import { useSelector, useDispatch } from 'react-redux';
import SessionExpiredComponent from './SessionExpiredComponent';
import { Loading } from './LoadingComponent';
import { updateProduct, updateFileReset } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        newName: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    });
const EditClientComponent = (props) => {
    const [nombre] = useState(props.user.nombre);
    const [administrador] = useState(props.user.administrador);
    const [comun] = useState(props.user.comun);

    const error = useSelector(state => state.user.errMess);
    const result = useSelector(state => state.user.result);
    const loading = useSelector(state => state.user.isLoading);

    const dispatch = useDispatch();

    const doUpdateUser = (userData)  => dispatch(updateProduct(userData));

    const uploadChanges = (values) => {
        const userData = {
            nick: props.user.nick,
            nombre: values.nombre,
            administrador: values.administrador,
            comun: values.comun
        }
        doUpdateUser(userData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: nombre,
            tipo: price
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });

}