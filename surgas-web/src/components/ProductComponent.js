import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';

const ProductsComponent = () => {
    return (
        <div>
            <br></br>
            <h3>Productos :)</h3>
            <hr />


            <CardDeck>
                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/propano.PNG"} alt="propano" />
                    <CardBody>
                        <CardTitle tag="h5">Gas propano</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Huele delicioso y cocina, el gas perfecto</CardSubtitle>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/acetileno.PNG"} alt="acetileno" />
                    <CardBody>
                        <CardTitle tag="h5">Acetileno</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Hace bumbum, tal vez; probablemente tóxico</CardSubtitle>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/argon.PNG"} alt="argon" />
                    <CardBody>
                        <CardTitle tag="h5">Argón</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">El argón es la hostia</CardSubtitle>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/oxigeno.PNG"} alt="oxigeno" />
                    <CardBody>
                        <CardTitle tag="h5">Oxígeno</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">LO NECESITAS PARA RESPIRAR, CÓMPRALO YA!!</CardSubtitle>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/Co2.PNG"} alt="Co2" />
                    <CardBody>
                        <CardTitle tag="h5">Co2</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Tú lo produces, y eres bastante bueno haciéndolo</CardSubtitle>
                    </CardBody>
                </Card>

                <Card>
                    <CardImg top width="100%" src={baseFrontUrl + "public/productos/extintores.PNG"} alt="extintores" />
                    <CardBody>
                        <CardTitle tag="h5">Extintores</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Muy útil para apagar fuegos indeseados</CardSubtitle>
                    </CardBody>
                </Card>
                
            </CardDeck>

            <br></br>
            
        </div>
    );
};


ProductsComponent.propTypes = {};

export default ProductsComponent;