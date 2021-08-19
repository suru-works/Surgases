import React from 'react';

import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Form, FormGroup, Input, Label, Alert
} from 'reactstrap';
import { useParams } from "react-router-dom";

import { verify }  from '../redux/ActionCreators';

import { useFormik } from "formik";

import * as yup from "yup";

const validationSchema = yup.object(
    {
        password: yup
            .string()
            .min(8,"la contraseña debe ser de minimo 8 caracteres")
            .max(100,"la contraseña debe ser de maximo 100 caracteres")
            .required("Este campo es obligatorio"),
        confirm_password: yup
            .string()
            .required("Este campo es obligatorio")
            .oneOf([yup.ref('password'), null], 'Las contraseñas deben de coincidir',),
    });

const Verify = () => {
    let params = useParams();
    const dispatch = useDispatch();

    const error = useSelector(state => state.verify.errMess);
    const result = useSelector(state => state.verify.result);
    const loading = useSelector(state => state.verify.isLoading);

    const doVerify = (data) => dispatch(verify(data));
    if (error) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Verificar cuenta</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <label>Ha ocurrido un error verificando tu cuenta, intenta ingresar de nuevo al sistema y repite el proceso de verificacion.</label>
                </div>
            </div>
        );
    }
    else if (loading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Verificar cuenta</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Loading />
                </div>
            </div>

        );

    }
    else if (result) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Verificar cuenta</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    <Label>Cuenta verificada exitosamente!</Label>
                </div>
            </div>
        );
    }
    else {
        console.log("token llegando");
        console.log(params.token);
        doVerify({token: params.token});
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Verificar cuenta</h3>
                        <hr />
                    </div>
                </div>
                <div className="row col-12 align-items-center justify-content-center">
                    Verificando tu cuenta.
                </div>
            </div>
        );
    }


};
Verify.propTypes = {};

export default Verify;