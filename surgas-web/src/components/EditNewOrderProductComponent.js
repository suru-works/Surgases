import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { products, updateProduct, deleteProduct, productsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const OrderProductModal = (props) => {

    const [error, setError] = useState(false);

    const [nombre] = useState(props.product.nombre);
    const [tipo] = useState(props.product.tipo);
    const [color] = useState(props.product.color);
    const [peso] = useState(props.product.peso);
    const [precio] = useState(props.product.precio);
    const [inventario] = useState(props.product.inventario);

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


    const userResult = useSelector(state => state.user.result);

    const productoxclienteResult = useSelector(state => state.productoxcliente.result);
    const productoxclienteLoading = useSelector(state => state.productoxcliente.loading);
    const productoxclienteError = useSelector(state => state.productoxcliente.result);

    const getServerIvaResult = useSelector(state => state.getServerIva.result);
    const getServerIvaLoading = useSelector(state => state.getServerIva.loading);
    const getServerIvaError = useSelector(state => state.getServerIva.result);

    const productoxclienteUpdateResult = useSelector(state => state.productoxclienteUpdate.result);
    const productoxclienteUpdateLoading = useSelector(state => state.productoxclienteUpdate.loading);
    const productoxclienteUpdateError = useSelector(state => state.productoxclienteUpdate.result);

    const productoxclienteInsertResult = useSelector(state => state.productoxclienteInsert.result);
    const productoxclienteInsertLoading = useSelector(state => state.productoxclienteInsert.loading);
    const productoxclienteInsertError = useSelector(state => state.productoxclienteInsert.result);

    const dispatch = useDispatch();

    const getIva = () => {
        let i = iva;
        if (productoxclienteResult) {
            if (productoxclienteResult.data.length > 0) {
                if (productoxclienteResult.data[0].iva_incluido.data[0] == 1) {
                    i = 'Si';
                }
                else{
                    i='No';
                }
            }
        }
        return (i);
    }

    const stringToBoolean= (string) =>{
        if(string == "Si"){
            return true;
        }
        else{
            return false;
        }
    }

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {

            nombre: nombre,
            tipo: tipo,
            color: color,
            peso: peso,
            precioSugerido: precio,
            precio: getPrecioVenta(),
            inventario: inventario,
            cantidad: 1,
            iva: iva,
            ivaEnCompra: getIva(),
            descuento: getDescuentoCliente()
        },
        validationSchema,
        onSubmit(values) {

            if (productoxclienteResult.data.length > 0) {
                dispatch(productoxclienteUpdate({product: props.product.codigo, client: props.client,iva_incluido:stringToBoolean(values.ivaEnCompra),descuento:values.descuento}));
            }
            else{
                dispatch(productoxclienteInsert({product: props.product.codigo, client: props.client,iva_incluido:stringToBoolean(values.ivaEnCompra),descuento: values.descuento}));
            }

            const product = {
                codigo: props.product.codigo,
                nombre: nombre,
                tipo: tipo,
                color: color,
                peso: peso,
                precio: values.precio,
                cantidad: values.cantidad,
                descuento:values.precio * values.descuento / 100,
                iva:values.precio * props.produt.valor_iva/100
            }
            const oldProduct = {
                codigo: props.product.codigo,
                nombre: nombre,
                tipo: tipo,
                color: color,
                peso: peso,
                precio: props.product.precio,
                cantidad: props.product.cantidad
                
            }
            let aux = props.UpdateNewOrderProduct({product, oldProduct});
            setError(aux);
            if(!aux){
                toggleAndReset();
            }
        }
    });
    const toggleAndReset = () => {

        dispatch(productoxclientePriceReset());
        dispatch(productoxclienteInsertReset());
        dispatch(productoxclienteUpdateReset());

        setError(false);
        resetForm();
        props.toggle();
    }

    const deleteProduct = () => {
        const productData = {
            codigo: props.product.codigo,
            precio: props.product.precio,
            cantidad: props.product.cantidad
        }
        props.deleteNewOrderProduct(productData);
    }
    if (error) {
        return (
            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toggleAndReset}>

                <ModalHeader toggle={toggleAndReset}>Añadir un producto al pedido</ModalHeader>

                <ModalBody>
                    Hubo un error actualizando el producto del pedido.
            </ModalBody>
            </Modal>
        );

    }
    return (

        <Modal className="modal-lg" isOpen={props.isOpen} toggle={toggleAndReset}>

            <ModalHeader toggle={toggleAndReset}>Añadir un producto al pedido</ModalHeader>

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
                                        <Label htmlFor="precio">Precio</Label>
                                        <Input type="text" id="precio" name="precio" value={values.precio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></Input>
                                        {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup className='col-12 col-sm-6'>
                                        <br></br>
                                        <div class="d-flex justify-content-center"  >
                                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type='submit' value='submit'>Añadir</Button>
                                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" onClick={deleteProduct}>Eliminar producto</Button>
                                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" onClick={toggleAndReset}>Cerrar</Button>
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


const EditNewOrderComponent = (props) => {

    if(props.product){
        return(
            <OrderProductModal updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} 
            product={props.product} isOpen={props.isOpen} toggle={props.toggle}></OrderProductModal>
        );
    }
    return(
        <div></div>
    );

}


EditNewOrderComponent.propTypes = {};

export default EditNewOrderComponent;