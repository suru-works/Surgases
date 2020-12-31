import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { products, addProduct, productsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(

    {
        codigo: yup
            .string()
            .min(1, "Ingrese el código")
    },
    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);

const AddProductComponent = (props) => {
 //TO DO
/*  Las inserciones de nuevos productos no estan funcionando... posiblemente por el json que se esta mandando en la solicitud */
    const error = useSelector(state => state.productsUpdate.errMess);
    const result = useSelector(state => state.productsUpdate.result);
    const loading = useSelector(state => state.productsUpdate.isLoading);

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(products());
        dispatch(productsUpdateReset());
        props.toggle();
    }

    const doAddProduct = (productData) => dispatch(addProduct(productData));

    const uploadChanges = (values) => {
        const productData = {
            
            codigo: values.codigo,
            nombre: values.nombre,
            color: values.color,
            pesoMinimo: values.pesoMinimo,
            pesoMaximo: values.pesoMaximo,
            tipo: values.tipo,
            precioMinimo: values.precioMinimo,
            precioMaximo: values.precioMaximo,
            inventarioMinimo: values.inventarioMinimo,
            inventarioMaximo: values.inventarioMaximo,
            disponible: values.disponible
        }
        doAddProduct(productData);        
    }
    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            codigo: '',
            nombre: '',
            color: '',

            pesoMinimo: '',
            pesoMaximo: '',
            tipo:  '',

            precioMinimo: '',
            precioMaximo: '',

            inventarioMinimo: '',
            inventarioMaximo: '',
            disponible: ''
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });


    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>
                <ModalBody>
                    <p>Producto añadido correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Añadir un producto</ModalHeader>

                <ModalBody>

                        <Form onSubmit={handleSubmit} >

                            <CardTitle> Ingresa los datos del producto</CardTitle>
                            <br></br>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}

                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="codigo">Código</Label>
                                    <Input type="text" id="codigo" name="codigo" value={values.codigo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {(touched.codigo && errors.codigo) ? (<Alert color="danger">{errors.codigo}</Alert>) : null}

                                </FormGroup>


                            </div>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="tipo">Tipo</Label>
                                    <Input type="text" id="tipo" name="tipo" value={values.tipo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="color">Color</Label>
                                    <Input type="text" id="color" name="color" value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                            </div>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="pesoMinimo">Peso mínimo</Label>
                                    <Input type="text" id="pesoMinimo" name="pesoMinimo" value={values.pesoMinimo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="pesoMaximo">Peso máximo</Label>
                                    <Input type="text" id="pesoMaximo" name="pesoMaximo" value={values.pesoMaximo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                            </div>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="precioMinimo">Precio mínimo</Label>
                                    <Input type="text" id="precioMinimo" name="precioMinimo" value={values.precioMinimo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="precioMaximo">Precio máximo</Label>
                                    <Input type="text" id="precioMaximo" name="precioMaximo" value={values.precioMaximo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                            </div>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="inventarioMinimo">Inventario mínimo</Label>
                                    <Input type="text" id="inventarioMinimo" name="inventarioMinimo" value={values.inventarioMinimo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="inventarioMaximo">Inventario máximo</Label>
                                    <Input type="text" id="inventarioMaximo" name="inventarioMaximo" value={values.inventarioMaximo}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                            </div>
                            
                            <br></br>

                            <div class="d-flex justify-content-center" >
                                <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} type="submit" value="submit"  >Actualizar</Button>
                            </div>

                        </Form>

                </ModalBody>
            </Modal>

        );
    }

}
AddProductComponent.propTypes = {};

export default AddProductComponent;