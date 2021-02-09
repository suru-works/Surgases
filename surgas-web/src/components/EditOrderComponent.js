import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, updateOrder, deleteOrder, ordersUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";


const OrderModal = (props) => {
    const [error, setError] = useState(false);

    /*const [fecha] = useState(props.order.fecha);
    const [numero] = useState(props.order.numero);
    const [hora_registro] = useState(props.order.hora_registro);
    const [direccion] = useState(props.order.direccion);
    const [precio_bruto] = useState(props.order.precio_bruto);
    const [precio_final] = useState(props.order.precio_final);
    const [estado] = useState(props.order.estado);
    const [bodega] = useState(props.order.bodega);
    const [puntos_compra] = useState(props.order.puntos_compra);
    const [tipo_cliente] = useState(props.order.tipo_cliente);
    const [nota] = useState(props.order.nota);
    const [usuario_registrador] = useState(props.order.usuario_registrador);
    const [cliente_pedidor] = useState(props.order.cliente_pedidor);
    const [empleado_despachador] = useState(props.order.empleado_despachador);

    const validationSchema = yup.object(
        {

            //TO DO: no se, orders
            
            fecha: yup

                .date()
                .required("Ingrese una fecha"),

            numero: yup

                .number()
                .required("Ingrese una cantidad.")
                .positive("La cantidad debe de ser positiva.")
        }
    );


    const userResult = useSelector(state => state.user.result);

    const dispatch = useDispatch();

    TO DO: hacer que no diga AAAAAAAAAAAAAAAA

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
*/

    const toogleAndReset = () => {
        setError(false);
        //resetForm();
        props.toggle();
    }
    

    if (error) {
        return (
            <Modal className="modal-lg" >

                <ModalHeader toggle={toogleAndReset}>Añadir un producto al pedidop</ModalHeader>

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
                    <Form  className="col" style={{ padding: 1 }} >
                        <Card style={{ padding: 11 }}>
                            <CardTitle> Verifica los datos del producto</CardTitle>
                            <CardBody style={{ padding: 8 }}>

                                <hr />

                                <a>AAAAAAAAAAAAAAAA</a>

                            </CardBody>

                        </Card>


                    </Form>

                </div>

            </ModalBody>
        </Modal>


    );
}


const EditOrderComponent = (props) => {

    if(props.order){
        return(
            <OrderModal order={props.order} isOpen={props.isOpen} toggle={props.toggle}></OrderModal>
        );
    }
    return(
        <div></div>
    );
    
}

EditOrderComponent.propTypes = {};

export default EditOrderComponent;