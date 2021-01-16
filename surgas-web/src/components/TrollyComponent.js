import React, { useState, useEffect } from 'react';
import { Alert, Table, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './LoadingComponent';
import { orders, addOrder, ordersUpdateReset, clients, updateClient, clientsUpdateReset, addClient, orderClient, orderClientReset, clientsUpdateRese } from '../redux/ActionCreators';
import { useFormik } from "formik";
import * as yup from "yup";
import { products, updateProduct } from '../redux/ActionCreators';
import Product from './ProductTableComponent';

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

const NewOrder = () => {
    
    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            fecha: '',
            
            numero: '',
            
            hora: '',
           
            direccion: '',
          
            precioBruto: '',
           
            precioFinal: '',
            estado: 'sin especificar',
            bodega: 'sin especificar',
         
            puntos: '',
            tipoCliente: 'sin especificar',
            nota: ''
        },
        validationSchema,
        /*onSubmit(values) {
            let orderData = []

            doSearch(orderData);
        }*/
    });

    return (
        <div>
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >

                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
                <hr />

                    <div className='row d-flex justify-content-center '>
                        <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                            <Label htmlFor="fecha">Fecha</Label>
                            <Input type="date" id="fecha" name="fecha"
                                value={values.fecha}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.fecha && errors.fecha) ? (<Alert color="danger">{errors.fecha}</Alert>) : null}
                        </FormGroup>
                        
                        <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                            <Label htmlFor="numero">Número</Label>
                            <Input type="number" id="numero" name="numero"
                                value={values.numero}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.numero && errors.numero) ? (<Alert color="danger">{errors.fecha}</Alert>) : null}
                        </FormGroup>
                    
                        <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                            <Label htmlFor="precioBruto">Precio bruto</Label>
                            <Input type="number" id="precioBruto" name="precioBruto"
                                value={values.precioBruto}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.precioBruto && errors.precioBruto) ? (<Alert color="danger">{errors.precioBruto}</Alert>) : null}
                        </FormGroup>
                    
                        <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                            <Label htmlFor="hora">Hora</Label>
                            <Input type="time" id="hora" name="hora"
                                value={values.hora}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.hora && errors.hora) ? (<Alert color="danger">{errors.hora}</Alert>) : null}
                        </FormGroup>
                    
                        <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-4 align-self-end'>
                            <Label htmlFor="puntos">Puntos</Label>
                            <Input type="number" id="puntos" name="puntos"
                                value={values.puntos}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.puntos && errors.puntos) ? (<Alert color="danger">{errors.puntos}</Alert>) : null}
                        </FormGroup>
                    
                        <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-4 align-self-end'>
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input type="text" id="direccion" name="direccion"
                                value={values.direccion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.direccion && errors.direccion) ? (<Alert color="danger">{errors.direccion}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
                            <Label htmlFor="estado">Estado</Label>
                            <Input type="select" id="estado" name="estado"
                                value={values.estado}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>sin especificar</option>
                                <option>en verificación</option>
                                <option>en cola</option>
                                <option>en proceso</option>
                                <option>fiado</option>
                                <option>pago</option>
                            </Input>
                            {(touched.estado && errors.estado) ? (<Alert color="danger">{errors.estado}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                            <Label htmlFor="bodega">Bodega</Label>
                            <Input type="select" id="bodega" name="bodega"
                                value={values.bodega}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>sin especificar</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                            {(touched.bodega && errors.bodega) ? (<Alert color="danger">{errors.bodega}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                            <Label htmlFor="tipoCliente">Tipo de cliente</Label>
                            <Input type="select" id="tipoCliente" name="tipoCliente"
                                value={values.tipoCliente}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option>sin especificar</option>
                                <option>empresarial</option>
                                <option>comun</option>
                            </Input>
                            {(touched.tipoCliente && errors.tipoCliente) ? (<Alert color="danger">{errors.tipoCliente}</Alert>) : null}
                        </FormGroup>
                        <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                            <Label htmlFor="nota">Nota</Label>
                            <Input type="textarea" id="nota" name="nota"
                                value={values.nota}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {(touched.nota && errors.nota) ? (<Alert color="danger">{errors.nota}</Alert>) : null}
                        </FormGroup>
                    
                    <FormGroup className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                        <br></br>
                        <div class="d-flex justify-content-center" >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit"  >Buscar</Button>
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                        </div>
                    </FormGroup>
                    
                    </div>
            </Form>
        </div>
    );
}

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(products()
        );
    }, []);

    const doSearch = (productData) => dispatch(products(productData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            nombre: '',
            disponible: '',
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
            if (values.disponible != '') {
                productData.push('disponible=' + (values.disponible));
            }
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
        <div>
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >
                
                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
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
                            onBlur={handleBlur} >

                            <option selected value=""> Seleccione </option>
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
                        <br></br>

                        <div class="d-flex justify-content-center"  >
                            <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" type="submit" value="submit" >Buscar</Button>
                            <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" onClick={resetForm}>Reiniciar parámetros</Button>
                        </div>

                    </FormGroup>

                </div>

            </Form>

        </div>
    );
}

const RenderSearchResultTuple = (props) => {
    const productData = props.product;

    return (
        <Product product={productData} />

    );

}

const SearchResult = () => {

    const error = useSelector(state => state.products.errMess);
    const result = useSelector(state => state.products.result);
    const loading = useSelector(state => state.products.isLoading);

    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((product) => {
            return (

                <RenderSearchResultTuple product={product} key={product.codigo}></RenderSearchResultTuple>

            );
        })

        return ( 
            <div>
                <Table className='col' responsive={true} bordered striped   >
                    
                    <thead className='theadTrolleyWidth'>
                        
                        <tr>
                            <th>Nombre</th>
                            <th>Disponible</th>
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


                <div class="d-flex justify-content-center"  >
                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} className="secondary-button" >Registrar pedido</Button>
                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} className="secondary-button" >Cancelar</Button>
                </div>



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

const Trolly = (props) => {
    const validationSchema = yup.object(

        {
        }
    );

    const orderClientError = useSelector(state => state.orderClient.errMess);
    const orderClientResult = useSelector(state => state.orderClient.result);
    const orderClientLoading = useSelector(state => state.orderClient.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        let clientData = [];
        clientData.push('telefono=' + props.telefono);
        dispatch(orderClient(clientData));
    }, []);


    if (orderClientLoading) {
        return (
            <Loading />
        );

    }
    if (orderClientError) {

        return (
            <div class="d-flex justify-content-center" >
                hubo un error
                <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} type="button" onClick={props.goBack}>Cerrar</Button>

            </div>
        );

    }
    if (orderClientResult) {
        return (
            <div className="container"> 

                <div className="row"> 

                    <div className="col-6"> 

                        <NewOrder/>
                        <CardTitle tag="h5">Nuevo Pedido</CardTitle>

                    </div>

                    <div className="col-6"> 

                        <SearchCriteria/>
                        <CardTitle tag="h5">Productos</CardTitle>
                        <CardBody>
                            <SearchResult></SearchResult>
                        </CardBody>

                    </div>

                </div>
            </div>

        );
    }
}

Trolly.propTypes = {};
export default Trolly;