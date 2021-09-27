import React, { useEffect, useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';

import { useFormik } from "formik";
import * as yup from "yup";

import SearchNewOrderEmployee from './SearchNewOrderEmployeeComponent';
import ReactTableProductsForTrolleyComponent from './ReactTableProductsForTrolleyComponent';
import ReactTableOrdersForTrolleyComponent from './ReactTableOrdersForTrolleyComponent';

import PrintOrderModal from './PrintOrderModal';

const validationSchema = yup.object(
    {

    }
);

const OrderModal = (props) => {

    const [isSearchEditOrderEmployeeModalOpen, setIsSearchEditOrderEmployeeModalOpen] = useState(false);
    const [isSearchEditOrderNewProductOpen, setIsSearchEditOrderNewProductOpen] = useState(false);
    const [isPrintOrderModalOpen, setIsPrintOrderModalOpen] = useState(false);


    const [editOrderFecha] = useState(props.order.fecha);
    const [editOrderNumero] = useState(props.order.numero);
    const [editOrderDireccion, setEditOrderDireccion] = useState(props.order.direccion);
    const [editOrderMunicipio, setEditOrderMunicipio] = useState(props.order.municipio);
    const [editOrderBodega, setEditOrderBodega] = useState(props.order.bodega);
    const [editOrderTipoCliente] = useState(props.order.tipo);
    const [editOrderEmpleado, setEditOrderEmpleado] = useState(props.order.empleado_repartidor);
    const [editOrderEmpleadoVendedor, setEditOrderEmpleadoVendedor] = useState(props.order.empleado_vendedor);
    const [editOrderNota, setEditOrderNota] = useState(props.order.nota);
    const [editOrderProducts, setEditOrderProducts] = useState(props.products);
    const [editOrderPrecioBruto, setEditOrderPrecioBruto] = useState(props.order.precio_bruto);
    const [editOrderPrecioFinal, setEditOrderPrecioFinal] = useState(props.order.precio_final);
    const [editOrderPuntos, setEditOrderPuntos] = useState(props.order.puntos_compra);
    const [editOrderDescuento, setEditOrderDescuento] = useState(props.order.descuento);
    const [editOrderTotalIva, setEditOrderTotalIva] = useState(props.order.iva);
    const [editOrderEstado, setEditOrderEstado] = useState(props.order.estado);

    const dispatch = useDispatch();

    const toogleSearchEditOrderEmployee = () => {
        if (isSearchEditOrderEmployeeModalOpen) {
            setIsSearchEditOrderEmployeeModalOpen(false);
        }
        else {
            setIsSearchEditOrderEmployeeModalOpen(true);
        }
    }
    const toogleSearchEditOrderNewProduct = () => {
        if (isSearchEditOrderNewProductOpen) {
            setIsSearchEditOrderNewProductOpen(false);
        }
        else {
            setIsSearchEditOrderNewProductOpen(true);
        }
    }

    const tooglePrintOrderModal = () => {
        if (isPrintOrderModalOpen) {
            setIsPrintOrderModalOpen(false);
        }
        else {
            setIsPrintOrderModalOpen(true);
        }
    }

    const addEditOrderProduct = () => {

    }

    const updateEditOrderProduct = () => {

    }

    const deleteEditOrderProduct = () => {

    }

    const handleSubmit = () => {

    }

    const editable = () => {
        if (props.order.estado == 'pago' || props.order.estado == 'fiado') {
            return (false);
        }
        return (true);
    }

    const stateOptions = () => {
        if (props.order.estado == 'pago') {
            return (
                <Input type="select" id="estado" name="estado"
                    value={editOrderEstado}
                    onChange={(event) => { setEditOrderEstado(event.target.value) }}>
                    <option>pago</option>
                </Input>
            );
        }
        else if (props.order.estado == 'fiado') {
            return (
                <Input type="select" id="estado" name="estado"
                    value={editOrderEstado}
                    onChange={(event) => { setEditOrderEstado(event.target.value) }}>
                    <option>fiado</option>
                    <option>pago</option>
                </Input>
            );
        }
        else {
            return (
                <Input type="select" id="estado" name="estado"
                    value={editOrderEstado}
                    onChange={(event) => { setEditOrderEstado(event.target.value) }}>
                    <option>verificacion</option>
                    <option>cola</option>
                    <option>proceso</option>
                    <option>fiado</option>
                    <option>pago</option>
                </Input>
            );
        }
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>

                <div className='col'>

                    <CardTitle tag="h3"> Pedido número: {editOrderNumero} de {editOrderFecha}</CardTitle>
                    <hr />

                    <div className='row d-flex justify-content-center '>

                        <FormGroup className='col-xs-12 col-lg-6 col-xl-4 align-self-end'>
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input type="text" id="direccion" name="direccion"
                                value={editOrderDireccion}
                                onChange={(event) => { setEditOrderDireccion(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-6 col-xl-2 align-self-end'>
                            <Label htmlFor="municipio">Municipio</Label>
                            <Input type="text" id="municipio" name="municipio"
                                value={editOrderMunicipio}
                                onChange={(event) => { setEditOrderMunicipio(event.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-2 col-xl-2'>
                            <Label htmlFor="bodega">Bodega</Label>
                            <Input type="select" id="bodega" name="bodega"
                                value={editOrderBodega}
                                onChange={(event) => { setEditOrderBodega(event.target.value) }}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-3 col-xl-4 align-self-end'>
                            <Label htmlFor="tipoCliente">Tipo de cliente</Label>
                            <Input type="select" id="tipoCliente" name="tipoCliente"
                                value={editOrderTipoCliente}
                                disabled>
                                <option>empresarial</option>
                                <option>comun</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='col-xs-3 col-lg-5 col-xl-4'>
                            <Label htmlFor="repartidor">Repartidor</Label>
                            <Input type="Text" id="repartidor" name="repartidor"
                                value={editOrderEmpleado}
                                disabled>
                            </Input>
                        </FormGroup>

                        <FormGroup className='col-xs-3 col-lg-2 col-xl-1'>
                            <button type="button" className="justify-self-center" class="btn pl-0" onClick={toogleSearchEditOrderEmployee}><i className="fa fa-search fa-2x botonCircular" ></i></button>
                            <SearchNewOrderEmployee toggle={toogleSearchEditOrderEmployee} isOpen={isSearchEditOrderEmployeeModalOpen} setNewOrderEmpleado={setEditOrderEmpleado} />
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-6 col-xl-4  align-self-end'>
                            <Label htmlFor="vendedor">Vendedor</Label>
                            <Input type="Text" id="vendedor" name="vendedor"
                                value={editOrderEmpleadoVendedor}
                                disabled>
                            </Input>
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-6 col-xl-3'>
                            <Label htmlFor="estado">Estado</Label>
                            {stateOptions()}
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-12 col-xl-12'>
                            <Label htmlFor="nota">Nota</Label>
                            <Input type="textarea" id="nota" name="nota"
                                value={editOrderNota}
                                onChange={(event) => { setEditOrderNota(event.target.value) }}
                            />
                        </FormGroup>

                    </div>
                    <CardBody className='p-0'>

                        <ReactTableOrdersForTrolleyComponent newOrderProducts={editOrderProducts} updateNewOrderProduct={updateEditOrderProduct} deleteNewOrderProduct={deleteEditOrderProduct} />

                    </CardBody>

                    <br />

                    <div className='row d-flex justify-content-center '>

                        <FormGroup className='col-xs-12 col-lg-12 col-xl-12'>
                            <div class="d-flex justify-content-end"  >
                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Añadir producto</Button>
                            </div>
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-6  col-xl-4 align-self-end'>
                            <Label htmlFor="precioBruto">Precio bruto</Label>
                            <Input type="number" id="precioBruto" name="precioBruto"
                                value={editOrderPrecioBruto}
                                onChange={(event) => { setEditOrderPrecioBruto(event.target.value) }}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-6  col-xl-4 align-self-end'>
                            <Label htmlFor="precioFinal">Precio Final</Label>
                            <Input type="number" id="precioFinal" name="precioFinal"
                                value={editOrderPrecioFinal}
                                onChange={(event) => { setEditOrderPrecioFinal(event.target.value) }}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-4 col-xl-4 align-self-end'>
                            <Label htmlFor="puntos">Puntos</Label>
                            <Input type="number" id="puntos" name="puntos"
                                value={editOrderPuntos}
                                onChange={(event) => { setEditOrderPuntos(event.target.value) }}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-4 col-xl-4 align-self-end'>
                            <Label htmlFor="descuento">Descuento total</Label>
                            <Input type="number" id="descuento" name="descuento"
                                value={editOrderDescuento}
                                onChange={(event) => { setEditOrderDescuento(event.target.value) }}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-lg-4 col-xl-4 align-self-end'>
                            <Label newOrderTotalIva="">Iva total</Label>
                            <Input type="number" id="newOrderTotalIva" name="newOrderTotalIva"
                                value={editOrderTotalIva}
                                onChange={(event) => { setEditOrderTotalIva(event.target.value) }}
                                disabled>
                            </Input>
                        </FormGroup>

                        <FormGroup className='col-xs-12 col-lg-12 col-xl-12'>
                            <div class="d-flex justify-content-around"  >
                                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" >Cerrar</Button>
                                <PrintOrderModal isOpen={isPrintOrderModalOpen} toggle={tooglePrintOrderModal} order={{numero: editOrderNumero, fecha: editOrderFecha}}/>
                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" onClick = {() => tooglePrintOrderModal()} >Imprimir pedido</Button>
                                <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" >Guardar cambios</Button>
                            </div>                            
                        </FormGroup>

                    </div>

                </div>
            </Form>
        </div>
    );
};


const EditOrderComponent = (props) => {

    const UpdateOrderOldOrderResult = useSelector(state => state.orderUpdateOldOrder.result);
    const UpdateOrderOldOrderLoading = useSelector(state => state.orderUpdateOldOrder.loading);
    const UpdateOrderOldOrderError = useSelector(state => state.orderUpdateOldOrder.error);


    const dispatch = useDispatch();

    const toggleAndReset = () => {
        props.toggle();
    }

    const viewState = () => {
        if (UpdateOrderOldOrderResult) {
            return (
                <OrderModal order={UpdateOrderOldOrderResult.data} isOpen={props.isOpen} toggle={props.toggle}></OrderModal>
            );
        }
        if (UpdateOrderOldOrderLoading) {
            return (
                <Loading />
            );
        }
        if (UpdateOrderOldOrderError) {
            return (
                <div>Hubo un error, intentalo de nuevo.</div>
            );
        }
    }

    return (
        <Modal className="modal-xl" isOpen={props.isOpen} toggle={toggleAndReset}>
            <ModalHeader toggle={toggleAndReset}>Editar un pedido</ModalHeader>
            <ModalBody>
                {viewState()}
            </ModalBody>
        </Modal>
    );

};

EditOrderComponent.propTypes = {};

export default EditOrderComponent;