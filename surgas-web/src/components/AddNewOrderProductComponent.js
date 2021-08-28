import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { lastProductPrice, productoxclientePrice, getServerIva,productoxclienteInsert,productoxclienteUpdate, productoxclientePriceReset,productoxclienteInsertReset,productoxclienteUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";


const NewProductForm = ({props}) =>{

    const [nombre] = useState(props.product.nombre);
    const [tipo] = useState(props.product.tipo);
    const [color] = useState(props.product.color);
    const [peso] = useState(props.product.peso);
    const [precio] = useState(props.product.precio);
    const [inventario] = useState(props.product.inventario);
    const [iva] = useState(props.product.iva_incluido);

    const [error, setError] = useState(false);



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
                .max(inventario, "La cantidad maxima del producto debe de ser menor o igual a la disponible en el inventario."),
            
            descuento: yup
                .number()
                .required("Ingrese una cantidad.")
                .min(0,"El porcentaje de descuento debe de ser entre 0 y 100.")
                .max(100, "El porcentaje de descuento debe de ser entre 0 y 100.")
        }
    );

    
    const userResult = useSelector(state => state.user.result);
    const precioAnteriorResult = useSelector(state => state.lastProductPrice.result);
    const precioAnteriorLoading = useSelector(state => state.lastProductPrice.loading);
    const precioAnteriorError = useSelector(state => state.lastProductPrice.result);

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
    const getPrecioVenta = () => {
        let p = precio
        if (precioAnteriorResult) {
            if (precioAnteriorResult.length > 0) {
                p = precioAnteriorResult.data[0].precio;
            }
        }

        return (p);
    }

    const stringToBoolean= (string) =>{
        if(string == "Si"){
            return true;
        }
        else{
            return false;
        }
    }
    const getDescuentoCliente = () => {
        if(productoxclienteResult){
            console.log("paso por aqui idiota");
            if(productoxclienteResult.data.length>0){
                console.log("paso por aqui tambien idiota");
                console.log(productoxclienteResult.data[0].descuento);
                console.log(typeof(productoxclienteResult.data[0].descuento));
                return productoxclienteResult.data[0].descuento;
            }
        }
        console.log(productoxclienteResult);
        return(0);
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

            
            const productData = {
                codigo: props.product.codigo,
                nombre: nombre,
                tipo: tipo,
                color: color,
                peso: peso,
                precio: values.precio,
                cantidad: values.cantidad,
                descuento:values.precio * values.descuento / 100,
                iva:values.precio * getServerIvaResult/100
            }

            let aux = props.addNewOrderProduct(productData);
            setError(aux);
            if (!aux) {
                toogleAndReset();
            }
        }
    });

    const toogleAndReset = () => {
        dispatch(productoxclientePriceReset());
        dispatch(productoxclienteInsertReset());
        dispatch(productoxclienteUpdateReset());

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
    return(
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
                                            <Input type="number" id="cantidad" name="cantidad" value={values.cantidad}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            {(touched.cantidad && errors.cantidad) ? (<Alert color="danger">{errors.cantidad}</Alert>) : null}
                                        </FormGroup>

                                    </div>

                                    <div className='row'>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="iva">Iva</Label>
                                            <Input type="select" name="iva" id="iva" value={values.iva} disabled
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
                                            <Input type="number" id="precio" name="precio" value={values.precio}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                                        </FormGroup>


                                    </div>
                                    <div className='row'>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="descuento">Porcentaje de descuento por unidad</Label>
                                            <Input type="number" id="descuento" name="descuento" value={values.descuento}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            {(touched.descuento && errors.descuento) ? (<Alert color="danger">{errors.descuento}</Alert>) : null}
                                        </FormGroup>

                                        <FormGroup className='col-12 col-sm-6'>
                                            <Label htmlFor="descuentoUnidad">Descuento por unidad</Label>
                                            <Input type="text" id="descuentoUnidad" name="descuentoUnidad" value={values.precio * values.descuento / 100} disabled
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            {(touched.descuentoUnidad && errors.descuentoUnidad) ? (<Alert color="danger">{errors.descuentoUnidad}</Alert>) : null}
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

const NewProductModal = (props) => {

    

    

    const userResult = useSelector(state => state.user.result);
    const precioAnteriorResult = useSelector(state => state.lastProductPrice.result);
    const precioAnteriorLoading = useSelector(state => state.lastProductPrice.loading);
    const precioAnteriorError = useSelector(state => state.lastProductPrice.result);

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

    useEffect(() => {
        dispatch(lastProductPrice({ product: props.product.codigo, client: props.client }));
        dispatch(productoxclientePrice({ product: props.product.codigo, client: props.client }));
        dispatch(getServerIva());
    }, []);



    

    
    const toogleAndReset = () => {
        dispatch(productoxclientePriceReset());
        dispatch(productoxclienteInsertReset());
        dispatch(productoxclienteUpdateReset());
        props.toggle();
    }

    if (precioAnteriorResult && productoxclienteResult && getServerIvaResult) {
        
        return (
            <NewProductForm props={props}></NewProductForm>
        );
    }
    if (precioAnteriorLoading || productoxclienteLoading || getServerIvaLoading) {
        return (
            <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

                <ModalHeader toggle={toogleAndReset}>Añadir un producto al pedido</ModalHeader>

                <ModalBody>
                    <Loading></Loading>
                </ModalBody>
            </Modal>
        );
    }

    return (
        <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

            <ModalHeader toggle={toogleAndReset}>Añadir un producto al pedido</ModalHeader>

            <ModalBody>
                Ha ocurrido un error en la carga de informacion.
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