import React, { useEffect, useState }from 'react';
import PropTypes from 'prop-types';


import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import Printer from './PrinterComponent';

import { printers } from '../redux/ActionCreators';

import { useFormik } from "formik";
import * as yup from "yup";

import { Container as FloatingButtonContainer, Button as FloatingButton, Link as FloatingButtonLink, lightColors, darkColors } from 'react-floating-action-button';
import AddPrinterComponent from './AddPrinterComponent';




const validationSchema = yup.object(

    {
        codigo: yup
            .string(),
        descripcion: yup
            .string()
    }
);

const SearchCriteria = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(printers());
    }, []);

    const doSearch = (userData) => dispatch(printers(userData));

    const { handleSubmit, handleChange, handleBlur, resetForm, touched, values, errors } = useFormik({
        initialValues: {
            codigo: '',
            descripcion: ''
        },
        validationSchema,
        onSubmit(values) {
            let printerData = []
            if (values.codigo != '') {
                printerData.push('codigo=' + values.codigo);
            }
            if (values.descripcion != '') {
                printerData.push('descripcion=' + values.descripcion);
            }
            doSearch(printerData);
        }
    });

    return (
        <div className="d-flex space-around row">
            <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }}  >


                <CardTitle tag="h3"> Ingresa los datos de la búsqueda</CardTitle>
                <hr />

                <div className='row d-flex justify-content-center '>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="codigo">Codigo</Label>
                        <Input type="text" id="codigo" name="codigo" value={values.codigo}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.codigo && errors.codigo) ? (<Alert color="danger">{errors.codigo}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-6 col-md-3 col-lg-3 align-self-end'>
                        <Label htmlFor="descripcion">Descripcion</Label>
                        <Input type="text" id="descripcion" name="descripcion" value={values.descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {(touched.descripcion && errors.descripcion) ? (<Alert color="danger">{errors.descripcion}</Alert>) : null}

                    </FormGroup>

                    <FormGroup className='col-xs-12 col-sm-12 col-md-12 col-lg-6 align-self-end'>
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
const RenderSearchResultTuple = (props) => {
    const printerData = props.printer;
    return (
        <Printer printer={printerData} />
    );

}

const SearchResult = () => {

    const error = useSelector(state => state.printers.errMess);
    const result = useSelector(state => state.printers.result);
    const loading = useSelector(state => state.printers.isLoading);



    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((printer) => {
            return (
                <RenderSearchResultTuple printer={printer} key={printer.codigo}></RenderSearchResultTuple>

            );
        })
        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
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

const SystemPrintersAdministration = () => {

    const [isAddPrinterModalOPen, setIsAddPrinterModalOPen] = useState(false);

    const toggleAddPrinterModal = () => {
        if (isAddPrinterModalOPen) {
            setIsAddPrinterModalOPen(false);
        } else {
            setIsAddPrinterModalOPen(true);
        }
    }

    return (
        <div className='col'>
            <Card style={{ margin: "10px", padding: "7px" }}>
                <CardBody>
                    <SearchCriteria></SearchCriteria>
                </CardBody>
            </Card>
            <Card>
                <CardTitle>
                    <CardText>Impresoras del sistema</CardText>
                </CardTitle>
                <CardBody>
                    <SearchResult></SearchResult>
                </CardBody>
            </Card>
            <FloatingButtonContainer >
                <FloatingButton tooltip="Añadir una impresora" styles={{ backgroundColor: "#fdd835" }} onClick={toggleAddPrinterModal} >

                    <i className="fa fa-plus fa-2x plusbutton" ></i>

                </FloatingButton>
            </FloatingButtonContainer>
            <AddPrinterComponent isOpen={isAddPrinterModalOPen} toggle={toggleAddPrinterModal}></AddPrinterComponent>
        </div>

    );
}


SystemPrintersAdministration.propTypes = {};

export default SystemPrintersAdministration;