import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { products, updateProduct, deleteProduct, productsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    //TO DO: hacer las validaciones
    {
        codigo: yup
            .string()
            .min(1, "Ingrese un código")
            
    },
    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
    );
const EditProductComponent = (props) => {

    const [codigo] = useState(props.product.codigo);
    const [nombre] = useState(props.product.nombre);
    const [color] = useState(props.product.color);
    const [pesoMinimo] = useState(props.product.pesoMinimo);
    const [pesoMaximo] = useState(props.product.pesoMaximo);
    const [tipo] = useState(props.product.tipo);
    const [precioMinimo] = useState(props.product.precioMinimo);
    const [precioMaximo] = useState(props.product.precioMaximo);
    const [inventarioMinimo] = useState(props.product.inventarioMinimo);
    const [inventarioMaximo] = useState(props.product.inventarioMaximo);
    const [disponible] = useState(props.product.disponible);

    const error = useSelector(state => state.productsUpdate.errMess);
    const result = useSelector(state => state.productsUpdate.result);
    const loading = useSelector(state => state.productsUpdate.isLoading);

    

    const dispatch = useDispatch();

    const toogleAndReset = () => {
        dispatch(products());
        dispatch(productsUpdateReset());
        props.toggle();
    }

    const doUpdateProduct = (productData) => dispatch(updateProduct(productData));

    const uploadChanges = (values) => {
        const productData = {
            codigo: props.product.codigo,
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
        doUpdateProduct(productData);
    }

    const doDeleteProduct = (productData) => dispatch(deleteProduct(productData));

    const deleteThatProduct = () => {
        const productData = {
            nombre: props.product.nombre
        }
        doDeleteProduct(productData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            codigo: codigo,
            nombre: nombre,
            color: color,

            pesoMinimo: pesoMinimo,
            pesoMaximo: pesoMaximo,
            tipo:  tipo,

            precioMinimo: precioMinimo,
            precioMaximo: precioMaximo,

            inventarioMinimo: inventarioMinimo,
            inventarioMaximo: inventarioMaximo,
            disponible: disponible
        },
        validationSchema,
        onSubmit(values) {
            const productData={
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
            uploadChanges(productData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>
                <ModalBody>
                    <p>Usuario Editado correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Editar un usuario</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos del usuario: {nombre}</CardTitle>
                                <CardBody style={{ padding: 8 }}>

                                    <hr />

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

                                    <FormGroup>
                                        <div class="d-flex justify-content-center" >
                                            <Button className="secondary-button" type="submit" value="submit"  >Actualizar</Button>
                                            <Button className="secondary-button" onClick={() => deleteThatProduct()}  >Eliminar Usuario</Button>
                                        </div>
                                    </FormGroup>

                                </CardBody>

                            </Card>


                        </Form>

                    </div>

                </ModalBody>
            </Modal>


        );
    }

}
EditProductComponent.propTypes = {};

export default EditProductComponent;