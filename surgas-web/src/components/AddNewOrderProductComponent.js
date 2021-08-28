import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { lastProductPrice, productoxclientePrice } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const NewProductModal = (props) => {

    const [error, setError] = useState(false);

    const [nombre] = useState(props.product.nombre);
    const [tipo] = useState(props.product.tipo);
    const [color] = useState(props.product.color);
    const [peso] = useState(props.product.peso);
    const [precio] = useState(props.product.precio);
    const [inventario] = useState(props.product.inventario);

    const userResult = useSelector(state => state.user.result);
    const precioAnteriorResult = useSelector(state => state.lastProductPrice.result);
    const precioAnteriorLoading = useSelector(state => state.lastProductPrice.loading);
    const precioAnteriorError = useSelector(state => state.lastProductPrice.result);

    const productoxclienteResult = useSelector(state => state.productoxcliente.result);
    const productoxclienteLoading = useSelector(state => state.productoxcliente.loading);
    const productoxclienteError = useSelector(state => state.productoxcliente.result);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(lastProductPrice({product: props.product.codigo, client:props.client}));
        dispatch(productoxclientePrice({product: props.product.codigo, client:props.client}));
    }, []);

    const validationSchema = yup.object(
        {
            precio: yup

                .number()
                .required("El producto debe tener un precio")
                .positive("El precio no puede ser negativo")
                .integer("Ingrese solo números enteros")
                .max(999999999999999, "El precio debe ser de máximo 15 caracteres"),

            cantidad: yup

                .number()
                .required("Ingrese una cantidad.")
                .positive("La cantidad debe de ser positiva.")
                .max(inventario, "La cantidad maxima del producto debe de ser menor o igual a la disponible en el inventario.")
        }
    );


    



    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {

            nombre: nombre,
            tipo: tipo,
            color: color,
            peso: peso,
            precioSugerido: precio,
            precio: precio,
            inventario: inventario,
            cantidad: 1
        },
        validationSchema,
        onSubmit(values) {
            const productData = {
                codigo: props.product.codigo,
                nombre: nombre,
                tipo: tipo,
                color: color,
                peso: peso,
                precio: values.precio,
                cantidad: values.cantidad
            }

            let aux = props.addNewOrderProduct(productData);
            setError(aux);
            if (!aux) {
                toogleAndReset();
            }
        }
    });
    const toogleAndReset = () => {
        setError(false);
        resetForm();
        props.toggle();
    }

    if (error) {
        return (
            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Añadir un producto al pedido</ModalHeader>

                <ModalBody>
                    El producto ya existia en los productos del pedido.
                </ModalBody>
            </Modal>
        );

    }
    return (

        <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

            <ModalHeader toggle={props.toggle}>Añadir un producto al pedido</ModalHeader>

            <ModalBody>

                <div className="d-flex space-around row">
                    <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                        <Card style={{ padding: 11 }}>
                            <CardTitle> Verifica los datos del producto: {nombre}</CardTitle>
                            <CardBody style={{ padding: 8 }}>

                                <hr />

                                <div className='row'>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input type="text" id="nombre" name="nombre" value={nombre} disabled />

                                    </FormGroup>
                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="peso">Peso</Label>
                                        <Input type="text" id="peso" name="peso" value={peso} disabled></Input>
                                    </FormGroup>
                                </div>

                                <div className='row'>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="tipo">Tipo</Label>
                                        <Input type="text" id="tipo" name="tipo" value={tipo} disabled></Input>
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="color">Color</Label>
                                        <Input type="text" id="color" name="color" value={color} disabled></Input>
                                    </FormGroup>

                                </div>

                                <div className='row'>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="inventario">Inventario</Label>
                                        <Input type="text" id="inventario" name="inventario" value={inventario} disabled></Input>
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="cantidad">Cantidad</Label>
                                        <Input type="text" id="cantidad" name="cantidad" value={values.cantidad}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input>
                                        {(touched.cantidad && errors.cantidad) ? (<Alert color="danger">{errors.cantidad}</Alert>) : null}
                                    </FormGroup>

                                </div>

                                <div className='row'>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="iva">Iva</Label>
                                        <Input type="select" name="iva" id="iva" value={values.iva}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                            <option>Si</option>
                                            <option>No</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="ivaEnCompra">Iva en la compra</Label>
                                        <Input type="select" name="ivaEnCompra" id="ivaEnCompra" value={values.ivaEnCompra}
                                            onChange={handleChange}
                                            onBlur={handleBlur}>
                                            <option>Si</option>
                                            <option>No</option>
                                        </Input>
                                    </FormGroup>

                                </div>

                                <div className='row'>



                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="precioSugerido">Precio sugerido</Label>
                                        <Input type="text" id="precioSugerido" name="precioSugerido" value={values.precioSugerido} disabled />
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="precio">Precio de la venta</Label>
                                        <Input type="text" id="precio" name="precio" value={values.precio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input>
                                        {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                                    </FormGroup>


                                </div>
                                <div className='row'>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="descuento">Porcentaje de descuento por unidad</Label>
                                        <Input type="text" id="descuento" name="descuento" value={values.descuento}
                                        ></Input>
                                        {(touched.descuento && errors.descuento) ? (<Alert color="danger">{errors.descuento}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <Label htmlFor="precio">Descuento por unidad</Label>
                                        <Input type="text" id="precio" name="precio" value={values.precio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input>
                                        {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                                    </FormGroup>


                                </div>

                                <div className='row'>
                                    <FormGroup className='col-12 col-sm-6'>
                                        <br></br>
                                        <div class="d-flex justify-content-center"  >
                                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type='submit' value='submit'>Añadir</Button>
                                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" onClick={toogleAndReset}>Cerrar</Button>
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


const AddNewOrderProductComponent = (props) => {

    if (props.product) {
        return (
            <NewProductModal addNewOrderProduct={props.addNewOrderProduct} client={props.client} product={props.product} isOpen={props.isOpen} toggle={props.toggle}></NewProductModal>
        );
    }
    return (
        <div></div>
    );


}


AddNewOrderProductComponent.propTypes = {};

export default AddNewOrderProductComponent;