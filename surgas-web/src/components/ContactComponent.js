import React, { useEffect, useState} from 'react';
import { Button, Label, Col, Row , Alert, Form, FormGroup, Input, Card, CardBody, CardText, CardHeader, UncontrolledCollapse   } from 'reactstrap';
import { Link } from 'react-router-dom';
import Map from './MapComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
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

        email: yup

            .number()
            .positive("El peso no puede ser negativo")
            .max(999999999999999, "El peso debe ser de máximo 15 caracteres"),

        recomendacion: yup

            .number()
            .positive("No pueden haber existencias negativas")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El inventario debe ser de máximo 15 caracteres"),
    }
);

const RenderMap = () => {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=`;


    const error = useSelector(state => state.maps.errMess);
    const result = useSelector(state => state.maps.maps);
    const loading = useSelector(state => state.maps.isLoading);

    if (error) {
        return (
            <label>Error cargando el mapa</label>
        );

    }
    if (loading) {
        return (
            <Loading></Loading>
        );

    }
    if (result) {
        return (


            <Map zoom={15} center={{ lat: 6.182236, lng: -75.5735974 }}
                withMarker={true}
                googleMapURL={mapUrl + `${result.data.key}`}
                containerElement={ <div style={{ height: `400px`, width: `auto` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapType='roadmap'
                loadingElement={<Loading />}

            />

        );
    }
    
        return (
            <div></div>
        );
    

}

const Contact = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Todos son guerrilleros menos yo")
    }, []);

    const doSearch = (productData) => dispatch();

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            nombre: '',
            telefono: '',
            email: '',
            teContactamos: '',
            metodoContacto: '',
            recomendacion: ''

        },
        validationSchema,
        onSubmit(values) {
            console.log("Todos son guerrilleros menos yo")
        }
    });


    return(


        <div className="container">

            <div className="col-12">
                <h3>Contáctanos</h3>
                <hr />
            </div>

            <div className="row row-content">
                
                
                <div className="col-12">
                    <h3>Información de localización</h3>
                </div>


                <div className="row col-12 ">

                    <div className="col-12 col-sm-6">
                        <h5>Nuestra dirección</h5>

                        <address>
                            Carrera 69 # 69 - 69.<br />
                            Apartamento número 420<br />
                            <i className="fa fa-mobile fa-lg"></i>: 420 420 69 69<br />
                            <i className="fa fa-mobile fa-lg"></i>: 420 420 69 69<br />
                            <i className="fa fa-envelope fa-lg"></i>: mi correo@gmail.com
                        </address>
                        <div className="col-12 col-sm-11 offset-sm-1">
                            <div className="btn-group" role="group">
                                <a role="button" className="btn btn-primary" target="_blank" rel="noopener noreferrer" href="tel:+4204206969"><i className="fa fa-phone"></i> Call</a>
                                <a role="button" className="btn btn-success" target="_blank" rel="noopener noreferrer" href="https://wa.me/4204206969"><i className="fa fa-whatsapp"></i> Whatsapp </a>
                                <a role="button" className="btn btn-info" target="_blank" rel="noopener noreferrer" href="mailto:micorreo@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 ">

                        <h5>Mapa de nuestra localización</h5>
                        <RenderMap></RenderMap>

                    </div>

                </div>

            </div>

            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h3>Preguntas frecuentes</h3>

                    <Card style={{ marginBottom: '1rem' }}>
                        <CardHeader id="toggler0"><h4>¿Cuales son los métodos de pago?</h4></CardHeader>
                        <UncontrolledCollapse toggler='#toggler0'>
                            <CardBody>
                                <CardText>El metodo de pago sera pactado directamente con el asesor.</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                    </Card>

                    <Card style={{ marginBottom: '1rem' }}>
                        <CardHeader id="toggler1"><h4>¿Cómo es el envío?</h4></CardHeader>
                        <UncontrolledCollapse toggler='#toggler1'>
                            <CardBody>
                                <CardText>Tenemos mensajeros disponibles para actuar en nuesta area de cobertura, pero por lo general el mismo instalador se encargara de llevar el producto.</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                    </Card>

                    <Card style={{ marginBottom: '1rem' }}>
                        <CardHeader id="toggler2"><h4>¿Como son las instalaciones?</h4></CardHeader>
                        <UncontrolledCollapse toggler='#toggler2'>
                            <CardBody>
                                <CardText>Enviaremos a un instalador experto cuando compres nuestro producto</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                    </Card>

                    <Card style={{ marginBottom: '1rem' }}>
                        <CardHeader id="toggler3"><h4>Vivo fuera de la ciudad de Medellín, ¿cuales son las areas de cobertura del servicio?</h4></CardHeader>
                        <UncontrolledCollapse toggler='#toggler3'>
                            <CardBody>
                                <CardText>Por lo general prestamos nuestro servicio en el departamento de Antioquia, pero se puede pactar para prestar el servicio en lugares mas alejados.</CardText>
                            </CardBody>
                        </UncontrolledCollapse>
                    </Card>
                </div>

                <div className="col-12 col-md-6">
                    <h3>Envíanos tus comentarios</h3>

                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="nombre" md={2}>Nombre</Label>
                            <Col md={10}>
                                
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="phoneNumber" md={2}>Telefono</Label>

                            <Col md={10}>
                                
                                    <Input type="text" id="telefono" name="telefono" value={values.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                    {(touched.telefono && errors.telefono) ? (<Alert color="danger">{errors.telefono}</Alert>) : null}
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>

                            <Col md={10}>
                                
                                    <Input type="text" id="email" name="email" value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                    {(touched.email && errors.email) ? (<Alert color="danger">{errors.email}</Alert>) : null}
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{ size: 6, offset: 2 }}>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    ¿Deberiamos contactarte?
                                    </Label>
                                </FormGroup>
                            </Col>

                            <Col md={{ size: 3, offset: 1 }}>
                                
                                <Col sm={10}>
                                    <Input type="select" name="metodoContacto" id="metodoContacto">
                                        <option>Telefono</option>
                                        <option>Email</option>
                                        
                                    </Input>
                                </Col>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="feedback" md={2}>Tu recomendacion o duda</Label>

                            <Col md={10}>
                                <Input type="textarea" name="recomendacion" id="recomendacion" />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        </div>

    );
}


export default Contact;