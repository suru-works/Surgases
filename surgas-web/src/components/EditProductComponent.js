import React, { useState } from 'react';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';
import { products, updateProduct, deleteProduct, productsUpdateReset } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object(
    {
        nombre: yup

            .string()
            .required("El producto debe tener un nombre")
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),

        color: yup

            .string()
            .required("El producto debe tener un color")
            .min(2, "El color debe ser de mínimo 2 caracteres")
            .max(15, "El color debe ser de máximo 15 caracteres"),

        peso: yup

            .number()
            .required("El producto debe tener peso")
            .positive("El peso no puede ser negativo")
            .max(999999999999999, "El peso debe ser de máximo 15 caracteres"),

        tipo: yup

            .string()
            .required("El producto debe tener tipo")
            .max(15, "El tipo debe ser de máximo 15 caracteres"),

        precio: yup

            .number()
            .required("El producto debe tener un precio")
            .positive("El precio no puede ser negativo")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El precio debe ser de máximo 15 caracteres"),

        inventario: yup

            .number()
            .required("Ingrese el número de productos en existencia")
            .positive("No pueden haber existencias negativas")
            .integer("Ingrese solo números enteros")
            .max(999999999999999, "El inventario debe ser de máximo 15 caracteres"),
    }
);

const ProductModal = (props) => {

    const [nombre] = useState(props.product.nombre);
    const [disponible] = useState(props.product.disponible);
    const [tipo] = useState(props.product.tipo);
    const [color] = useState(props.product.color);
    const [peso] = useState(props.product.peso);
    const [precio] = useState(props.product.precio);
    const [inventario] = useState(props.product.inventario);
    const [iva_incluido] = useState(props.product.iva_incluido);

    const error = useSelector(state => state.productsUpdate.errMess);
    const result = useSelector(state => state.productsUpdate.result);
    const loading = useSelector(state => state.productsUpdate.isLoading);

    const userResult = useSelector(state => state.user.result);

    const dispatch = useDispatch();

    const toggleAndReset = () => {
        dispatch(products());
        dispatch(productsUpdateReset());
        props.toggle();
    }

    const doUpdateProduct = (productData) => dispatch(updateProduct(productData));

    const uploadChanges = (productData) => {
        
        doUpdateProduct(productData);
    }

    const doDeleteProduct = (productData) => dispatch(deleteProduct(productData));

    const deleteThatProduct = () => {
        const productData = {
            codigo: props.product.codigo
        }
        doDeleteProduct(productData);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {

            nombre: nombre,
            disponible: disponible.data[0],
            tipo: tipo,
            color: color,
            peso: peso,
            precio: precio,
            inventario: inventario,
            iva_incluido: iva_incluido.data[0]
        },
        validationSchema,
        onSubmit(values) {    
            const productData = {
                codigo: props.product.codigo,
                nombre: values.nombre,
                tipo: values.tipo,
                color: values.color,
                peso: values.peso,
                precio: values.precio,
                inventario: values.inventario
    
            }
    
            if (values.disponible == "1") {
                productData.disponible = 1;
            } else {
                productData.disponible = 0;
            }
    
            if (values.iva_incluido == "1") {
                productData.iva_incluido = 1;
            } else {
                productData.iva_incluido = 0;
            }        
            uploadChanges(productData);
        }
    });

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toggleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toggleAndReset}>
                <ModalHeader toggle={toggleAndReset}>Editar un producto</ModalHeader>
                <ModalBody>
                    <p>Producto editado correctamente.</p>
                </ModalBody>

                <div className="d-flex justify-content-center" >
                    <Button onClick={toggleAndReset} style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }}>Aceptar</Button>
                </div>



            </Modal>
        );
    }
    else {
        if (userResult.data.es_admin.data[0] == 1) {
            return (

                <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                    <ModalHeader toggle={props.toggle}>Editar un producto</ModalHeader>

                    <ModalBody>

                        <div className="d-flex space-around row">
                            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                                <Card style={{ padding: 11 }}>
                                    <CardTitle> Ingresa los datos del producto: {nombre}</CardTitle>
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

                                                <Input type="select" id="disponible" name="disponible" value={values.disponible}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} >

                                                    <option selected value={1}>Si</option>
                                                    <option value={0}>No</option>
                                                </Input>
                                                {(touched.disponible && errors.disponible) ? (<Alert color="danger">{errors.disponible}</Alert>) : null}

                                            </FormGroup>


                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="tipo">Tipo</Label>
                                                <Input type="text" id="tipo" name="tipo" value={values.tipo}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {(touched.tipo && errors.tipo) ? (<Alert color="danger">{errors.tipo}</Alert>) : null}
                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="color">Color</Label>
                                                <Input type="text" id="color" name="color" value={values.color}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {(touched.color && errors.color) ? (<Alert color="danger">{errors.color}</Alert>) : null}
                                            </FormGroup>

                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="peso">Peso</Label>
                                                <Input type="text" id="peso" name="peso" value={values.peso}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {(touched.peso && errors.peso) ? (<Alert color="danger">{errors.peso}</Alert>) : null}
                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="precio">Precio</Label>
                                                <Input type="text" id="precio" name="precio" value={values.precio}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {(touched.precio && errors.precio) ? (<Alert color="danger">{errors.precio}</Alert>) : null}
                                            </FormGroup>

                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="inventario">Inventario</Label>
                                                <Input type="text" id="inventario" name="inventario" value={values.inventario}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {(touched.inventario && errors.inventario) ? (<Alert color="danger">{errors.inventario}</Alert>) : null}
                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="iva_incluido">Iva</Label>

                                                <Input type="select" id="iva_incluido" name="iva_incluido" value={values.iva_incluido}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} >

                                                    <option selected value={1}>Si</option>
                                                    <option value={0}>No</option>
                                                </Input>
                                                {(touched.iva_incluido && errors.iva_incluido) ? (<Alert color="danger">{errors.iva_incluido}</Alert>) : null}

                                            </FormGroup>

                                        </div>
                                        <div className='row'>
                                            <FormGroup className='col-12 col-sm-6'>
                                                <br></br>
                                                <div class="d-flex justify-content-center"  >
                                                    <Button style={{ margin: 10, backgroundColor: '#fdd835', color: '#000000' }} color="secondary" type="submit" value="submit"  >Actualizar</Button>
                                                    <Button style={{ margin: 10, backgroundColor: '#c6a700', color: '#000000' }} color="secondary" onClick={() => deleteThatProduct()}  >Eliminar Producto</Button>
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
        else {
            return (

                <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                    <ModalHeader toggle={toggleAndReset}>Editar un producto</ModalHeader>

                    <ModalBody>

                        <div className="d-flex space-around row">
                            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                                <Card style={{ padding: 11 }}>
                                    <CardTitle> Ingresa los datos del producto: {nombre}</CardTitle>
                                    <CardBody style={{ padding: 8 }}>

                                        <hr />

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="nombre">Nombre</Label>
                                                <Input type="text" id="nombre" name="nombre" value={nombre} disabled={true} />

                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="disponible">Disponible</Label>

                                                <Input type="text" id="disponible" name="disponible" value={disponible.data[0]} disabled={true}>
                                                </Input>

                                            </FormGroup>


                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="tipo">Tipo</Label>
                                                <Input type="text" id="tipo" name="tipo" value={tipo} disabled={true}></Input>
                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="color">Color</Label>
                                                <Input type="text" id="color" name="color" value={color} disabled={true}></Input>
                                            </FormGroup>

                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="peso">Peso</Label>
                                                <Input type="text" id="peso" name="peso" value={peso} disabled={true}></Input>
                                            </FormGroup>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="precio">Precio</Label>
                                                <Input type="text" id="precio" name="precio" value={precio} disabled={true}></Input>
                                            </FormGroup>

                                        </div>

                                        <div className='row'>

                                            <FormGroup className='col-12 col-sm-6'>
                                                <Label htmlFor="inventario">Inventario</Label>
                                                <Input type="text" id="inventario" name="inventario" value={inventario} disabled={true}></Input>
                                            </FormGroup>
                                            <Input type="select" id="iva_incluido" name="iva_incluido" value={values.iva_incluido}
                                                onChange={handleChange}
                                                onBlur={handleBlur} >

                                                <option selected value={1}>Si</option>
                                                <option value={0}>No</option>
                                            </Input>
                                            {(touched.iva_incluido && errors.iva_incluido) ? (<Alert color="danger">{errors.iva_incluido}</Alert>) : null}



                                        </div>
                                        <div className='row'>
                                            <FormGroup className='col-12 col-sm-6'>
                                                <br></br>
                                                <div class="d-flex justify-content-center"  >
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

    }

}

const EditProductComponent = (props) => {

    if (props.product) {
        return (
            <ProductModal product={props.product} isOpen={props.isOpen} toggle={props.toggle}></ProductModal>
        );
    }
    return (
        <div></div>
    );

}

EditProductComponent.propTypes = {};

export default EditProductComponent;