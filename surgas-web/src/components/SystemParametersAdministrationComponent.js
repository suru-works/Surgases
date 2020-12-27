import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { systemParameters, systemParametersUpdate } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';

import { Alert, Table, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useFormik } from "formik";
import * as yup from "yup";


/* TO DO: realizar validaciones de los parametos, implementar actualizacion de parametros */
const validationSchema = yup.object(

    {
        nombre: yup
            .string()
            .min(2, "El nombre debe ser de mínimo 2 caracteres")
            .max(25, "El nombre debe ser de máximo 25 caracteres"),
    }
);

const RenderSystemParameters = (props) => {
    
    const dispatch = useDispatch();

    const doUpdateParams = (ParamsData) => dispatch(systemParametersUpdate(ParamsData));

    const uploadChanges = (values) => {
        doUpdateParams(values);
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            limPuntos: props.params.limPuntos,
            limPuntosAcomulables: props.params.limPuntosAcomulables,
            puntosxkilo: props.params.puntosxkilo,
            obsequio: props.params.obsequio,
            puntos_descontados_por_obsequio: props.params.puntos_descontados_por_obsequio,
            tiempo_de_gracia: props.params.tiempo_de_gracia,
            tiempo_de_redencion: props.params.tiempo_de_redencion
        },
        validationSchema,
        onSubmit(values) {
            uploadChanges(values);
        }
    });



    
    
        return (
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Parametros del sistema</CardText>
                </CardTitle>
                <CardBody>
                    <div className="d-flex space-around row">
                        <Form onSubmit={handleSubmit} className="col" style={{ padding: 1 }} >
                            <Card style={{ padding: 11 }}>
                                <CardBody style={{ padding: 8 }}>

                                    <FormGroup>
                                        <Label htmlFor="limPuntos">Limite de puntos</Label>
                                        <Input type="text" id="limPuntos" name="limPuntos" value={values.limPuntos}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.limPuntos && errors.limPuntos) ? (<Alert color="danger">{errors.limPuntos}</Alert>) : null}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="limPuntosAcomulables">limite de puntos acomulables</Label>
                                        <Input type="text" id="limPuntosAcomulables" name="limPuntosAcomulables" value={values.limPuntosAcomulables}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.limPuntosAcomulables && errors.limPuntosAcomulables) ? (<Alert color="danger">{errors.limPuntosAcomulables}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="puntosxkilo">Puntos dados por kilo</Label>
                                        <Input type="text" id="puntosxkilo" name="puntosxkilo" value={values.puntosxkilo}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.puntosxkilo && errors.puntosxkilo) ? (<Alert color="danger">{errors.puntosxkilo}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="obsequio">Obsequio</Label>
                                        <Input type="text" id="obsequio" name="obsequio" value={values.obsequio}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.obsequio && errors.obsequio) ? (<Alert color="danger">{errors.obsequio}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="puntos_descontados_por_obsequio">Puntos descontados por obsequio</Label>
                                        <Input type="text" id="puntos_descontados_por_obsequio" name="puntos_descontados_por_obsequio" value={values.puntos_descontados_por_obsequio}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.puntos_descontados_por_obsequio && errors.puntos_descontados_por_obsequio) ? (<Alert color="danger">{errors.puntos_descontados_por_obsequio}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="tiempo_de_gracia">Tiempo de gracia</Label>
                                        <Input type="text" id="tiempo_de_gracia" name="tiempo_de_gracia" value={values.tiempo_de_gracia}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.tiempo_de_gracia && errors.tiempo_de_gracia) ? (<Alert color="danger">{errors.tiempo_de_gracia}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="tiempo_de_redencion">Tiempo de redencion</Label>
                                        <Input type="text" id="tiempo_de_redencion" name="tiempo_de_redencion" value={values.tiempo_de_redencion}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {(touched.tiempo_de_redencion && errors.tiempo_de_redencion) ? (<Alert color="danger">{errors.tiempo_de_redencion}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <div class="d-flex justify-content-center" >
                                            <Button className="secondary-button" type="submit" value="submit"  >Actualizar parametros</Button>
                                        </div>
                                    </FormGroup>



                                </CardBody>

                            </Card>


                        </Form>

                    </div>
                </CardBody>
            </Card>
        );
    


    
}

const SystemParametersAdministration = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(systemParameters());
    }, []);

    const error = useSelector(state => state.systemParameters.errMess);
    const result = useSelector(state => state.systemParameters.result);
    const loading = useSelector(state => state.systemParameters.isLoading);

    if (loading) {
        return (
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Parametros del sistema</CardText>
                </CardTitle>
                <CardBody>
                    <div className="d-flex space-around row">
                        <Card style={{ padding: 11 }}>
                            <CardBody style={{ padding: 8 }}>

                                <Loading></Loading>

                            </CardBody>

                        </Card>

                    </div>
                </CardBody>
            </Card>
        );
    }
    else if (error) {
        return (
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Parametros del sistema</CardText>
                </CardTitle>
                <CardBody>
                    <div className="d-flex space-around row">
                        <Card style={{ padding: 11 }}>
                            <CardBody style={{ padding: 8 }}>

                                <CardText>Hubo un error</CardText>

                            </CardBody>

                        </Card>

                    </div>
                </CardBody>
            </Card>
        );
    }
    else if (result) {
        return (
            <RenderSystemParameters params ={result.data[0]}></RenderSystemParameters>
        );
    }
    return (
        <div>Error desconocido</div>
    ); 

    

    
}


SystemParametersAdministration.propTypes = {};

export default SystemParametersAdministration;