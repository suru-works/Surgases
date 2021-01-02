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


    const [nombre] = useState(props.product.nombre);
    const [disponible] = useState(props.product.disponible);
    const [tipo] = useState(props.product.tipo);
    const [color] = useState(props.product.color);
    const [peso] = useState(props.product.peso);
    const [precio] = useState(props.product.precio);
    const [inventario] = useState(props.product.inventario);

    

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

            nombre: values.nombre,
            disponible: values.disponible,
            tipo: values.tipo,
            color: values.color,
            peso: values.peso,
            precio: values.precio,
            inventario: values.inventario

        }
        doUpdateProduct(productData);
    }

    const doDeleteProduct = (productData) => dispatch(deleteProduct(productData));

    const deleteThatProduct = () => {
        const productData = {
            codigo: props.product.codigo
        }
        doDeleteProduct(productData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            
            nombre: nombre,
            disponible: disponible.data[0],
            tipo: tipo,
            color: color,
            peso: peso,
            precio: precio,
            inventario: inventario
        },
        validationSchema,
        onSubmit(values) {
            const productData={
                nombre: values.nombre,
                disponible: values.disponible,
                tipo: values.tipo,
                color: values.color,
                peso: values.peso,
                precio: values.precio,
                inventario: values.inventario
            }
            uploadChanges(productData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <p>Producto Producto correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Editar un producto</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardTitle> Ingresa los datos del producto: {nombre}</CardTitle>
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
                                    <Label htmlFor="disponible">Disponible</Label>
                                
                                    <Input type="select" id="disponible" name="disponible" value={values.disponible}
                                        onChange={handleChange}
                                        onBlur={handleBlur} >
                                            
                                        <option selected value={1}>Si</option>
                                        <option          value={0}>No</option>
                                    </Input>
                                    {(touched.disponible && errors.disponible) ? (<Alert color="danger">{errors.disponible}</Alert>) : null}

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
                                    <Label htmlFor="peso">Peso</Label>
                                    <Input type="text" id="peso" name="peso" value={values.peso}
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                                </FormGroup>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="precio">Precio</Label>
                                    <Input type="text" id="precio" name="precio" value={values.precio}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                            </div>

                            <div className='row'>

                                <FormGroup className='col-12 col-sm-6'>
                                    <Label htmlFor="inventario">Inventario</Label>
                                    <Input type="text" id="inventario" name="inventario" value={values.inventario}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </FormGroup>

                                <FormGroup  className='col-12 col-sm-6'>
                                    <br></br>
                                    <div class="d-flex justify-content-center"  >
                                        <Button className="secondary-button" type="submit" value="submit"  >Actualizar</Button>
                                        <Button className="secondary-button" onClick={() => deleteThatProduct()}  >Eliminar Producto</Button>
                                    </div>
                                </FormGroup>

                            </div>
                            

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