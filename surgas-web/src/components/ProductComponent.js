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
                                <CardText>Las mezclas de propano con el aire pueden ser explosivas con concentraciones del 1,8 al 9,3 % Vol de propano. La llama del propano, al igual que la de los demás gases combustibles, debe ser completamente azul; cualquier parte amarillenta, anaranjada o rojiza de la misma, denota una mala combustión. A temperatura ambiente, es inerte frente a la mayor parte de los reactivos aunque reacciona por ejemplo con el bromo en presencia de luz. En elevadas concentraciones el butano tiene propiedades narcotizantes.</CardText>
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
                                <CardText>El acetileno o etino es el alquino más sencillo. Es un gas, altamente inflamable, un poco más ligero que el aire e incoloro. Produce una de las temperaturas de llama adiabática más altas (3250°C)</CardText>
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
                                <CardText>El argón es un elemento químico de número atómico 18 y símbolo Ar. Es el tercero de los gases nobles, incoloro e inerte como ellos, constituye el 0,934 % del aire seco. Su nombre proviene del griego ἀργός [argos], que significa inactivo (debido a que no reacciona)</CardText>
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
                                <CardText>Las mezclas de propano con el aire pueden ser explosivas con concentraciones del 1,8 al 9,3 % Vol de propano. La llama del propano, al igual que la de los demás gases combustibles, debe ser completamente azul; cualquier parte amarillenta, anaranjada o rojiza de la misma, denota una mala combustión. A temperatura ambiente, es inerte frente a la mayor parte de los reactivos aunque reacciona por ejemplo con el bromo en presencia de luz. En elevadas concentraciones el butano tiene propiedades narcotizantes.</CardText>
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
                                <CardText>El argón es un elemento químico de número atómico 18 y símbolo Ar. Es el tercero de los gases nobles, incoloro e inerte como ellos, constituye el 0,934 % del aire seco. Su nombre proviene del griego ἀργός [argos], que significa inactivo (debido a que no reacciona)</CardText>
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
                                <CardText>Las mezclas de propano con el aire pueden ser explosivas con concentraciones del 1,8 al 9,3 % Vol de propano. La llama del propano, al igual que la de los demás gases combustibles, debe ser completamente azul; cualquier parte amarillenta, anaranjada o rojiza de la misma, denota una mala combustión. A temperatura ambiente, es inerte frente a la mayor parte de los reactivos aunque reacciona por ejemplo con el bromo en presencia de luz. En elevadas concentraciones el butano tiene propiedades narcotizantes.</CardText>
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
                                <CardText>Las mezclas de propano con el aire pueden ser explosivas con concentraciones del 1,8 al 9,3 % Vol de propano. La llama del propano, al igual que la de los demás gases combustibles, debe ser completamente azul; cualquier parte amarillenta, anaranjada o rojiza de la misma, denota una mala combustión. A temperatura ambiente, es inerte frente a la mayor parte de los reactivos aunque reacciona por ejemplo con el bromo en presencia de luz. En elevadas concentraciones el butano tiene propiedades narcotizantes.</CardText>
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
                                <CardText>El acetileno o etino es el alquino más sencillo. Es un gas, altamente inflamable, un poco más ligero que el aire e incoloro. Produce una de las temperaturas de llama adiabática más altas (3250°C)</CardText>
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
                                <CardText>El argón es un elemento químico de número atómico 18 y símbolo Ar. Es el tercero de los gases nobles, incoloro e inerte como ellos, constituye el 0,934 % del aire seco. Su nombre proviene del griego ἀργός [argos], que significa inactivo (debido a que no reacciona)</CardText>
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
                                <CardText>El acetileno o etino es el alquino más sencillo. Es un gas, altamente inflamable, un poco más ligero que el aire e incoloro. Produce una de las temperaturas de llama adiabática más altas (3250°C)</CardText>
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