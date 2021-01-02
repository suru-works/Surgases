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
        codigo: yup
            .string()
            .min(1, "Ingrese el código")
    },
    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(products()
        );
    }, []);

    const doSearch = (productData) => dispatch(products(productData));

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            nombre: '',
            disponible: '',
            tipo:  '',
            color: '',
            peso: '',
            precio: '',
            inventario: ''

        },
        validationSchema,
        onSubmit(values) {
            doSearch(values);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >
                <Card style={{ padding: 11 }}>
                    <br></br>
                    <CardTitle> Ingresa los datos de la búsqueda</CardTitle>
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
                                <Input type="text" id="disponible" name="disponible" value={values.disponible}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
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
                                    <Button style={{ backgroundColor: '#fdd835', color: '#000000'}} 
                                    className="secondary-button" type="submit" value="submit">Buscar</Button>
                                </div>
                            </FormGroup>

                        </div>

                    </CardBody>

                </Card>


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

                //TO DO: El que sepa arreglar este pedazo que lo arrele tenkiu, yo supongo que es por ese .codigo que algo diferente va ahi o no c

                <RenderSearchResultTuple product={product} key={product.codigo}></RenderSearchResultTuple>

            );
        })

        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
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
                <tbody>
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

    const toggleAddProductModal = () => {
        if (isAddProductModalOpen) {
            setIsAddProductModalOpen(false);
        } else {
            setIsAddProductModalOpen(true);
        }
    }

    return (
        <div className='col' >
            <Card  >
                <CardTitle >
                    <CardText>Criterios de búsqueda</CardText>
                </CardTitle>
                <CardBody>
                    <SearchCriteria></SearchCriteria>
                </CardBody>
            </Card>
            <Card>
                <CardTitle>
                    <CardText>Productos</CardText>
                </CardTitle>
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

ProductsAdministration.propTypes = {};

export default ProductsAdministration;