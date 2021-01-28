import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import Product from './ProductTableComponent';
import { useSelector, useDispatch } from 'react-redux';
import { products, updateProduct } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddProductComponent from './AddProductComponent';


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
        <div className="d-flex space-around row">
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
            <Table className='col' responsive={true} bordered striped   >
                
                <thead className='theadProductsWidth'>
                    
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
                <tbody className='tbodyAlto600px tbodyProductsWidth'>
                    {ResultTuples}
                </tbody>

            </Table>
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

const ProductsAdministration = () => {


    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const userResult = useSelector(state => state.user.result);

    const toggleAddProductModal = () => {
        if (isAddProductModalOpen) {
            setIsAddProductModalOpen(false);
        } else {
            setIsAddProductModalOpen(true);
        }
    }

    if (userResult.data.tipo.includes("administrador")) {
        return (
            <div className='col' >
                <Card style={{ margin: "10px", padding: "7px" }} >
                    <CardBody>
                        <SearchCriteria></SearchCriteria>
                    </CardBody>
                </Card>
                <Card>
                    <br />
                    <CardTitle tag="h3">Productos</CardTitle>
                    <CardBody>
                        <SearchResult></SearchResult>
                    </CardBody>
                </Card>

                <FloatingButtonContainer >
                    <FloatingButton tooltip="Añadir un producto" styles={{ backgroundColor: "#fdd835" }} onClick={toggleAddProductModal} >

                        <i className="fa fa-plus fa-2x plusbutton" ></i>

                    </FloatingButton>
                </FloatingButtonContainer>

                <AddProductComponent isOpen={isAddProductModalOpen} toggle={toggleAddProductModal}></AddProductComponent>
            </div>
        );

    }
    else {
        return (
            <div className='col' >
                <Card style={{ margin: "10px", padding: "7px" }}>
                    <CardBody>
                        <SearchCriteria></SearchCriteria>
                    </CardBody>
                </Card>
                <Card>
                    <br />
                    <CardTitle tag="h3"> Productos</CardTitle>
                    <CardBody>
                        <SearchResult></SearchResult>
                    </CardBody>
                </Card>
            </div>

        );
    }


}

ProductsAdministration.propTypes = {};

export default ProductsAdministration;