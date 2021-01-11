import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardImg, CardTitle, CardText, Media, CardSubtitle, CardBody } from 'reactstrap';
import { baseFrontUrl } from '../shared/baseUrl';

const ProductsComponent = () => {
    return (
        <div>
            <br></br>
            <h1 >Productos por categoría</h1>
            <hr />  

            <div className="container">
                <div className='card-container'>

                    <Card>
                        <Media>
                            <Media  className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/propano.jpg"} alt="propano" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Propano</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/acetileno.jpg"} alt="acetileno" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Acetileno</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="50%" src={baseFrontUrl + "public/productos/argon.jpg"} alt="argon" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Argon</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media  className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/oxigeno.jpg"} alt="oxigeno" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Propano</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/extintores.jpg"} alt="extintores" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Acetileno</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="50%" src={baseFrontUrl + "public/productos/argon.jpg"} alt="argon" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Argon</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media  className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/propano.jpg"} alt="propano" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Propano</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/Co2.jpg"} alt="Co2" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Acetileno</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="50%" src={baseFrontUrl + "public/productos/oxigeno.jpg"} alt="oxigeno"/>
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Argon</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media  className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/propano.jpg"} alt="propano" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Propano</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/acetileno.jpg"} alt="acetileno" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Acetileno</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="50%" src={baseFrontUrl + "public/productos/argon.jpg"} alt="argon" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Argon</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="100%" src={baseFrontUrl + "public/productos/acetileno.jpg"} alt="acetileno" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Acetileno</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    <Card>
                        <Media>
                            <Media className="align-self-center">
                                <CardImg top width="50%" src={baseFrontUrl + "public/productos/extintores.jpg"} alt="extintores" />
                            </Media>
                            <div className="align-self-center m-3">
                                <CardTitle tag="h5">Argon</CardTitle>
                                <CardText>Huele delicioso y cocina, el gas perfecto</CardText>
                            </div>
                        </Media>
                    </Card>

                    

                </div>



                <br></br>
            </div>


        </div>
    );
};


ProductsComponent.propTypes = {};

export default ProductsComponent;