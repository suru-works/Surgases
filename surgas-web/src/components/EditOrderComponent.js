import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { products, updateProduct, deleteProduct, productsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";


const EditOrderComponent = (props) => {
    const [error, setError] = useState(false);

    const [fecha] = useState(props.product.fecha);
    const [numero] = useState(props.product.numero);
    const [hora_registro] = useState(props.product.hora_registro);
    const [direccion] = useState(props.product.direccion);
    const [precio_bruto] = useState(props.product.precio_bruto);
    const [precio_final] = useState(props.product.precio_final);
    const [estado] = useState(props.product.estado);
    const [bodega] = useState(props.product.bodega);
    const [puntos_compra] = useState(props.product.puntos_compra);
    const [tipo_cliente] = useState(props.product.tipo_cliente);
    const [nota] = useState(props.product.nota);
    const [usuario_registrador] = useState(props.product.usuario_registrador);
    const [cliente_pedidor] = useState(props.product.cliente_pedidor);
    const [empleado_despachador] = useState(props.product.empleado_despachador);

    const validationSchema = yup.object(
        {
            fecha: yup

                .date()
                .required("Ingrese una fecha"),

                numero: yup

                .number()
                .required("Ingrese una cantidad.")
                .positive("La cantidad debe de ser positiva.")
                .max(inventario, "La cantidad maxima del producto debe de ser menor o igual a la disponible en el inventario.")
        }
    );


    const userResult = useSelector(state => state.user.result);

    const dispatch = useDispatch();



    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {

            nombre: nombre,
            tipo: tipo,
            color: color,
            peso: peso,
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
            if(!aux){
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

        <Modal className="modal-lg" isOpen={props.isOpen} toggle={toogleAndReset}>

            <ModalHeader toggle={toogleAndReset}>Añadir un producto al pedido</ModalHeader>

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

EditOrderComponent.propTypes = {};

export default EditOrderComponent;