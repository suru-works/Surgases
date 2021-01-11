import React, { Component, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import Map from './MapComponent';
import { baseFrontUrl } from '../shared/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { useFormik } from "formik";
import * as yup from "yup";

import {maps} from '../redux/ActionCreators';


const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .max(25, "El nombre debe ser de máximo 25 caracteres"),

        color: yup

            .string()
            .max(15, "El color debe ser de máximo 15 caracteres"),

        peso: yup

            .number()
            .positive("El peso no puede ser negativo")
            .max(999999999999999, "El peso debe ser de máximo 15 caracteres"),

        tipo: yup

            .string()
            .max(15, "El tipo debe ser de máximo 15 caracteres"),

        precio: yup

            .number()
            .positive("El precio no puede ser negativo")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El precio debe ser de máximo 15 caracteres"),

        inventario: yup

            .number()
            .positive("No pueden haber existencias negativas")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El inventario debe ser de máximo 15 caracteres"),
    }
);


const Contact = () => {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us Your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                            <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 6, offset: 2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model=".agree" name="agree"
                                            className="form-check-input"
                                             /> {' '}
                                            <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>
                            <FormGroup className='col-12 col-sm-6'>
                                <Label htmlFor="disponible">Disponible</Label>

                                <Input type="select" id="disponible" name="disponible" value={values.disponible}
                                    onChange={handleChange}
                                    onBlur={handleBlur} >

                                    <option selected value=""> Tel </option>
                                    <option value={0}>Email</option>
                                </Input>
                                {(touched.disponible && errors.disponible) ? (<Alert color="danger">{errors.disponible}</Alert>) : null}

                            </FormGroup>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                            <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                            <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}


export default Contact;