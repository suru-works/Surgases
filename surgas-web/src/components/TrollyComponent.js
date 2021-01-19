import React, { useState, useEffect } from 'react';
import { Alert, Table, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, lastOrder, newOrderEmployees } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import { products, updateProduct, trolleyProducts } from '../redux/ActionCreators';
import Product from './ProductTableComponent';
import AddNewOrderProductComponent from './AddNewOrderProductComponent';
import EditNewOrderProductComponent from './EditNewOrderProductComponent';
import SearchNewOrderEmployee from './SearchNewOrderEmployeeComponent';

import SetClient from './OrderSetClientComponent';
import CreateClientData from './OrderCreateClientDataComponent';
import UpdateClientData from './OrderUpdateClientDataComponent';

const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .max(25, "El nombre debe ser de máximo 25 caracteres"),

        color: yup

            .string()
            .max(15, "El color debe ser de máximo 15 caracteres"),

        peso: yup

            .number()
            .positive("El peso no puede ser negativo")
            .max(999999999999999, "El peso debe ser de máximo 15 caracteres"),

        tipo: yup

            .string()
            .max(15, "El tipo debe ser de máximo 15 caracteres"),

        precio: yup

            .number()
            .positive("El precio no puede ser negativo")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El precio debe ser de máximo 15 caracteres"),

        inventario: yup

            .number()
            .positive("No pueden haber existencias negativas")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El inventario debe ser de máximo 15 caracteres"),
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        let productData = [];
        productData.push('disponible=' + ('1'));

        dispatch(trolleyProducts(productData));
    }, []);

    const doSearch = (productData) => dispatch(trolleyProducts(productData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            nombre: '',
            disponible: 1,
            tipo: '',
            color: '',
            peso: '',
            precio: '',
            inventario: ''

        },
        validationSchema,
        onSubmit(values) {
            let productData = []
            if (values.nombre != '') {
                productData.push('nombre=' + values.nombre);
            }
            productData.push('disponible=' + (values.disponible));

            if (values.tipo != '') {
                productData.push('tipo=' + values.tipo);
            }
            if (values.color != '') {
                productData.push('color=' + values.color);
            }
            if (values.peso != '') {
                productData.push('peso=' + values.peso);
            }
            if (values.precio != '') {
                productData.push('precio=' + values.precio);
            }
            if (values.inventario != '') {
                productData.push('inventario=' + values.inventario);
            }

            doSearch(productData);
        }
    });

    return (
        <div className="col" style={{ padding: 1 }}>

            <CardTitle tag="h3"> Búsqueda de productos</CardTitle>
            <hr />

            <div className='row d-flex justify-content-center'>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-4'>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input type="text" id="nombre" name="nombre" value={values.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.nombre && errors.nombre) ? (<Alert color="danger">{errors.nombre}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
                    <Label htmlFor="disponible">Disponible</Label>

                    <Input type="select" id="disponible" name="disponible" value={values.disponible}
                        onChange={handleChange}
                        onBlur={handleBlur} disabled>

                        <option value=""> Seleccione </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>

                    </Input>
                    {(touched.disponible && errors.disponible) ? (<Alert color="danger">{errors.disponible}</Alert>) : null}

                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-2'>
                    <Label htmlFor="tipo">Tipo</Label>
                    <Input type="text" id="tipo" name="tipo" value={values.tipo}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-3'>
                    <Label htmlFor="color">Color</Label>
                    <Input type="text" id="color" name="color" value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.color && errors.color) ? (<Alert color="danger">{errors.color}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-2'>
                    <Label htmlFor="peso">Peso</Label>
                    <Input type="text" id="peso" name="peso" value={values.peso}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.peso && errors.peso) ? (<Alert color="danger">{errors.peso}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-2'>
                    <Label htmlFor="precio">Precio</Label>
                    <Input type="text" id="precio" name="precio" value={values.precio}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                </FormGroup>


                <FormGroup className='col-xs-12 col-sm-6 col-md-4  col-lg-2'>
                    <Label htmlFor="inventario">Inventario</Label>
                    <Input type="text" id="inventario" name="inventario" value={values.inventario}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {(touched.inventario && errors.inventario) ? (<Alert color="danger">{errors.inventario}</Alert>) : null}
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-5  col-lg-5'>

                    <div class="d-flex justify-content-center"  >
                        <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Buscar</Button>
                        <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                    </div>

                </FormGroup>

            </div>

        </div>
    );
}

const RenderSearchResultTuple = (props) => {
    const product = props.product;

    const [isAddNewOrderModalOpen, setIsAddNewOrderModalOpen] = useState(false);

    const toggleAddNewOrderProductModal = () => {
        if (isAddNewOrderModalOpen) {
            setIsAddNewOrderModalOpen(false);
        } else {
            setIsAddNewOrderModalOpen(true);
        }
    }

    return (

        <tr onClick={() => toggleAddNewOrderProductModal()}>
            <th scope="row">{product.nombre}</th>
            <td>{product.tipo}</td>
            <td>{product.color}</td>
            <td>{product.peso}</td>
            <td>{product.precio}</td>
            <td>{product.inventario}</td>

            <AddNewOrderProductComponent addNewOrderProduct={props.addNewOrderProduct} product={product} isOpen={isAddNewOrderModalOpen} toggle={toggleAddNewOrderProductModal}></AddNewOrderProductComponent>
        </tr>
    );

}

const SearchResult = (props) => {

    const error = useSelector(state => state.trolleyProducts.errMess);
    const result = useSelector(state => state.trolleyProducts.result);
    const loading = useSelector(state => state.trolleyProducts.isLoading);

    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((product) => {
            return (

                <RenderSearchResultTuple addNewOrderProduct={props.addNewOrderProduct} product={product} key={product.codigo}></RenderSearchResultTuple>

            );
        })

        return (
            <div>
                <Table className='col' responsive={true} size="sm" bordered striped   >

                    <thead className='theadTrolleyWidth'>

                        <tr>
                            <th>Nombre</th>

                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Peso</th>
                            <th>Precio</th>
                            <th>Inventario</th>
                        </tr>

                    </thead>
                    <tbody className='tbodyAlto300px tbodyTrolleyWidth'>
                        {ResultTuples}
                    </tbody>

                </Table>
            </div>
        );
    }
    if (error) {

        return (
            <div> hubo un error</div>

        );

    }
    return (
        <div></div>
    );

}

const RenderNewOrderProductTuple = (props) => {
    const product = props.product;

    const [isEditNewOrderProductModalOpen, setIsEditNewOrderProductModalOpen] = useState(false);

    const toggleEditNewOrderProductProductModal = () => {
        if (isEditNewOrderProductModalOpen) {
            setIsEditNewOrderProductModalOpen(false);
        } else {
            setIsEditNewOrderProductModalOpen(true);
        }
    }

    return (

        <tr onClick={() => toggleEditNewOrderProductProductModal()}>
            <th scope="row">{product.nombre}</th>
            <td>{product.tipo}</td>
            <td>{product.color}</td>
            <td>{product.peso}</td>
            <td>{product.precio}</td>
            <td>{product.cantidad}</td>

            <EditNewOrderProductComponent updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} product={product} isOpen={isEditNewOrderProductModalOpen} toggle={toggleEditNewOrderProductProductModal}></EditNewOrderProductComponent>
        </tr>
    );
}

const NewOrderProductsTable = (props) => {
    const NewOrderProductsTuples = props.newOrderProducts.map((product) => {
        return (

            <RenderNewOrderProductTuple updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} product={product} key={product.codigo}></RenderNewOrderProductTuple>

        );
    })

    return (
        <div>
            <Table className='col' responsive={true} size="sm" bordered striped   >

                <thead className='theadTrolleyWidth'>

                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Color</th>
                        <th>Peso</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>

                </thead>
                <tbody className='tbodyAlto300px tbodyTrolleyWidth'>
                    {NewOrderProductsTuples}
                </tbody>

            </Table>

        </div>
    );
}

const NewOrder = (props) => {
    const orderClientResult = useSelector(state => state.orderClient.result);
    const lastOrderResult = useSelector(state => state.lastOrder.result);

    const [isSearchNewOrderEmployeeModalOpen, setIsSearchNewOrderEmployeeModalOpen] = useState(false);
    useEffect(() => {
        if (lastOrderResult.pedido) {
            props.setNewOrderDireccion(lastOrderResult.pedido.direccion);
            props.setNewOrderBodega(lastOrderResult.pedido.bodega);
            props.setNewOrderNota(lastOrderResult.pedido.nota);
            props.setNewOrderDescuento(orderClientResult.data[0].descuento);
        }
    }, []);

    const toogleSearchNewOrderEmployee = () => {
        if (isSearchNewOrderEmployeeModalOpen) {
            setIsSearchNewOrderEmployeeModalOpen(false);
        }
        else {
            setIsSearchNewOrderEmployeeModalOpen(true);
        }
    }
    return (
        <div className='col'>

            <CardTitle tag="h3"> Nuevo pedido</CardTitle>
            <hr />

            <div className='row d-flex justify-content-center '>
                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-4 align-self-end'>
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input type="date" id="fecha" name="fecha"
                        value={props.newOrderFecha}
                        onChange={(event) => { props.setNewOrderFecha(event.target.value) }}
                    />
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6 align-self-end'>
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input type="text" id="direccion" name="direccion"
                        value={props.newOrderDireccion}
                        onChange={(event) => { props.setNewOrderDireccion(event.target.value) }}
                    />
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-2'>
                    <Label htmlFor="bodega">Bodega</Label>
                    <Input type="select" id="bodega" name="bodega"
                        value={props.newOrderBodega}
                        onChange={(event) => { props.setNewOrderBodega(event.target.value) }}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Input>
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-4  align-self-end'>
                    <Label htmlFor="tipoCliente">Tipo de cliente</Label>
                    <Input type="select" id="tipoCliente" name="tipoCliente"
                        value={props.newOrderTipoCliente}
                        disabled>
                        <option>empresarial</option>
                        <option>comun</option>
                    </Input>
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6  align-self-end'>
                    <Label htmlFor="tipoCliente">Repartidor</Label>
                    <Input type="Text" id="tipoCliente" name="tipoCliente"
                        value={props.newOrderEmpleado.nombre + '(' + props.newOrderEmpleado.id + ')'}
                        disabled>
                    </Input>
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-2'>
                    <button type="button" className="justify-self-center" class="btn" onClick={toogleSearchNewOrderEmployee}><i className="fa fa-search fa-2x botonCircular" ></i></button>
                    <SearchNewOrderEmployee toggle={toogleSearchNewOrderEmployee} isOpen={isSearchNewOrderEmployeeModalOpen} setNewOrderEmpleado={props.setNewOrderEmpleado} />
                </FormGroup>

                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-12 '>
                    <Label htmlFor="nota">Nota</Label>
                    <Input type="textarea" id="nota" name="nota"
                        value={props.newOrderNota}
                        onChange={(event) => { props.setNewOrderNota(event.target.value) }}
                    />
                </FormGroup>

            </div>

            <CardBody className='p-0'>
                <NewOrderProductsTable newOrderProducts={props.newOrderProducts} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct}></NewOrderProductsTable>
            </CardBody>

            <br />

            <div className='row d-flex justify-content-center '>

                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6 align-self-end'>
                    <Label htmlFor="precioBruto">Precio bruto</Label>
                    <Input type="number" id="precioBruto" name="precioBruto"
                        value={props.newOrderPrecioBruto}
                        onChange={(event) => { props.setNewOrderPrecioBruto(event.target.value) }}
                        disabled
                    />
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6 align-self-end'>
                    <Label htmlFor="precioFinal">Precio Final</Label>
                    <Input type="number" id="precioFinal" name="precioFinal"
                        value={props.newOrderPrecioFinal}
                        onChange={(event) => { props.setNewOrderPrecioFinal(event.target.value) }}
                        disabled
                    />
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-4 align-self-end'>
                    <Label htmlFor="puntos">Puntos</Label>
                    <Input type="number" id="puntos" name="puntos"
                        value={props.newOrderPuntos}
                        onChange={(event) => { props.setNewOrderPuntos(event.target.value) }}
                        disabled
                    />
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-4 align-self-end'>
                    <Label htmlFor="descuento">Descuento</Label>
                    <Input type="number" id="descuento" name="descuento"
                        value={props.newOrderDescuento}
                        onChange={(event) => { props.setNewOrderDescuento(event.target.value) }}
                    />
                </FormGroup>
                <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-4 align-self-end'>
                    <Label htmlFor="estado">Estado</Label>
                    <Input type="select" id="estado" name="estado"
                        value={props.newOrderEstado}
                        onChange={(event) => { props.setNewOrderEstado(event.target.value) }}
                        disabled>
                        <option>en cola</option>
                        <option>en proceso</option>
                        <option>fiado</option>
                        <option>pago</option>
                    </Input>
                </FormGroup>

            </div>

        </div>
    );
}

const Trolly = (props) => {
    const orderClientError = useSelector(state => state.orderClient.errMess);
    const orderClientResult = useSelector(state => state.orderClient.result);
    const orderClientLoading = useSelector(state => state.orderClient.isLoading);

    const newOrderEmployeesError = useSelector(state => state.newOrderEmployees.errMess);
    const newOrderEmployeesResult = useSelector(state => state.newOrderEmployees.result);
    const newOrderEmployeesLoading = useSelector(state => state.newOrderEmployees.isLoading);

    const lastOrderError = useSelector(state => state.lastOrder.errMess);
    const lastOrderResult = useSelector(state => state.lastOrder.result);
    const lastOrderLoading = useSelector(state => state.lastOrder.isLoading);

    const addOrderError = useSelector(state => state.ordersUpdate.errMess);
    const addOrderResult = useSelector(state => state.ordersUpdate.result);
    const addOrderLoading = useSelector(state => state.ordersUpdate.isLoading);

    const date = new Date();
    const agno = date.getFullYear();
    let mes = date.getMonth() + 1;
    if (mes <= 9) {
        mes = '0' + mes;
    }
    let dia = date.getDate();
    if (dia <= 9) {
        dia = '0' + dia;
    }

    const [newOrderProducts, setNewOrderProducts] = useState([]);
    const [newOrderPrecioBruto, setNewOrderPrecioBruto] = useState(0);
    const [newOrderPrecioFinal, setNewOrderPrecioFinal] = useState(0);
    const [newOrderPuntos, setNewOrderPuntos] = useState(0);
    const [newOrderFecha, setNewOrderFecha] = useState(agno + '-' + mes + '-' + dia);
    const [newOrderDireccion, setNewOrderDireccion] = useState('');
    const [newOrderBodega, setNewOrderBodega] = useState('1');
    const [newOrderTipoCliente, setNewOrderTipoCliente] = useState('comun');
    const [newOrderNota, setNewOrderNota] = useState('');
    const [newOrderEstado, setNewOrderEstado] = useState('en cola');
    const [newOrderDescuento, setNewOrderDescuento] = useState(0.0);
    const [newOrderEmpleado, setNewOrderEmpleado] = useState('');


    function findByKey(key, value) {
        return (item, i) => item[key] === value
    }

    const addNewOrderProduct = (producto) => {
        let findParams = findByKey('codigo', producto.codigo);
        let index = newOrderProducts.findIndex(findParams);
        if (index < 0) {
            let producticos = newOrderProducts.slice();
            producticos.push(producto);
            //calculando precios y puntos
            let nuevoPrecio = newOrderPrecioBruto + (producto.precio) * producto.cantidad;
            setNewOrderPrecioBruto(nuevoPrecio);
            setNewOrderPrecioFinal(nuevoPrecio - (nuevoPrecio * newOrderDescuento / 100));
            setNewOrderProducts(producticos);
            return (false);
        }
        return (true);

    }

    const updateNewOrderProduct = ({ product, oldProduct }) => {
        let findParams = findByKey('codigo', product.codigo);
        let index = newOrderProducts.findIndex(findParams);
        if (index < -1) {
            return (true);
        }
        let producticos = newOrderProducts.slice();
        producticos[index] = product;
        setNewOrderProducts(producticos);
        let nuevoPrecio = newOrderPrecioBruto - (oldProduct.precio) * oldProduct.cantidad
        setNewOrderPrecioBruto(nuevoPrecio);
        setNewOrderPrecioBruto(nuevoPrecio + (product.precio) * product.cantidad);
        setNewOrderPrecioFinal(nuevoPrecio - (nuevoPrecio * newOrderDescuento / 100));
        return (false);
    }

    const deleteNewOrderProduct = (product) => {
        let findParams = findByKey('codigo', product.codigo);
        let index = newOrderProducts.findIndex(findParams);
        if (index < -1) {
            return (true);
        }
        let producticos = newOrderProducts.slice();
        producticos.splice(index, 1);
        setNewOrderProducts(producticos);
        let nuevoPrecio = newOrderPrecioBruto - (product.precio) * product.cantidad
        setNewOrderPrecioBruto(nuevoPrecio);
        setNewOrderPrecioFinal(nuevoPrecio - (nuevoPrecio * newOrderDescuento / 100));
        return (false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        let clientData = [];
        clientData.push('telefono=' + props.telefono);
        dispatch(orderClient(clientData));
        dispatch(lastOrder(props.telefono));
    }, []);

    const handleSubmit = () => {

        let newOrderProductsSimplified = [];

        newOrderProducts.map((product) => {
            newOrderProductsSimplified.push({
                codigo: product.codigo,
                precio: product.precio,
                cantidad: product.cantidad
            });
        })

        let newOrderData = {
            cliente_pedidor: orderClientResult.data[0].telefono,
            fecha: newOrderFecha,
            direccion: newOrderDireccion,
            nota: newOrderNota,
            empleado: newOrderEmpleado.id,
            productos: newOrderProductsSimplified,
            descuento: newOrderDescuento,
            estado: newOrderEstado,
            bodega: newOrderBodega
        }
        dispatch(addOrder(newOrderData));
    }



    if (orderClientLoading || lastOrderLoading || addOrderLoading) {
        return (
            <Loading />
        );

    }
    if (orderClientError || lastOrderError || addOrderError) {

        return (
            <div class="d-flex justify-content-center" >
                hubo un error
                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cerrar</Button>

            </div>
        );

    }
    if (addOrderResult) {
        props.submit();
        return (
            <div></div>
        );
    }
    if (orderClientResult && lastOrderResult ) {
        return (
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <div className="row">


                        <div className="col-6">

                            <NewOrder
                                deleteNewOrderProduct={deleteNewOrderProduct}
                                updateNewOrderProduct={updateNewOrderProduct}
                                newOrderProducts={newOrderProducts}
                                setNewOrderProducts={setNewOrderProducts}
                                newOrderPrecioBruto={newOrderPrecioBruto}
                                newOrderPrecioFinal={newOrderPrecioFinal}
                                setNewOrderPrecioBruto={setNewOrderPrecioBruto}
                                newOrderPuntos={newOrderPuntos}
                                setNewOrderPuntos={setNewOrderPuntos}
                                newOrderFecha={newOrderFecha}
                                setNewOrderFecha={setNewOrderFecha}
                                newOrderDireccion={newOrderDireccion}
                                setNewOrderDireccion={setNewOrderDireccion}
                                newOrderBodega={newOrderBodega}
                                setNewOrderBodega={setNewOrderBodega}
                                newOrderTipoCliente={newOrderTipoCliente}
                                setNewOrderTipoCliente={setNewOrderTipoCliente}
                                newOrderNota={newOrderNota}
                                setNewOrderNota={setNewOrderNota}
                                newOrderEstado={newOrderEstado}
                                setNewOrderEstado={setNewOrderEstado}
                                newOrderDescuento={newOrderDescuento}
                                setNewOrderDescuento={setNewOrderDescuento}
                                newOrderEmpleado={newOrderEmpleado}
                                setNewOrderEmpleado={setNewOrderEmpleado}
                            />
                        </div>

                        <div className="col-6">

                            <SearchCriteria />
                            <CardTitle tag="h5">Productos</CardTitle>
                            <CardBody className='p-0'>
                                <SearchResult addNewOrderProduct={addNewOrderProduct}></SearchResult>
                            </CardBody>

                        </div>

                    </div>
                    <div className="row">

                        <div className="col "  >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" >Ver pedido anterior</Button>
                        </div>

                        <div className="col contieneBotones"  >
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="justify-self-end secondary-button" >Cancelar</Button>
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="justify-self-end secondary-button" >Registrar pedido</Button>
                        </div>
                    </div>
                </Form>
            </div>

        );
    }

    return (<div></div>);
}

Trolly.propTypes = {};
export default Trolly;