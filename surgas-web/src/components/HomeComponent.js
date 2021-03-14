import React, { Component, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { baseFrontUrl } from '../shared/baseUrl';

import PropTypes from 'prop-types';

const HomeComponent = () => {
    return (
        <div className="homeBackgroung">
            
            <Jambo />
            <br></br>
            <br></br>
            <Vitrina />
            <br></br>
            <Promos />
            <br></br>
            <br></br>

        </div>
    );
};

const Jambo = () => {

    const [abierto, setAbierto] = useState(true);

    const switchAbierto  = () => {
        if (abierto){
            setAbierto(false);
        }
        else{
            setAbierto(true);
        }

    }

    if (abierto){
        return(

            
            <div className="jumbotron pt-5 pb-1">
                <div className="row row-header">
                    <div className="col-9" >

                        <div className="justify-content-center row m-3 " >

                            <img className="d-none d-md-block" height="150" 
                            src={baseFrontUrl + "public/logo/S-14-cropped.png"} alt="company-logo"></img>

                        </div>

                        <h3>Calidad de servicios y productos garantizada</h3>
                        
                        <h3>Nos enorgullecemos de tener el mejor servicio postventa</h3>

                        <div className="col-12" >


                            <Link to='/contacto'>
                                <Button style={{ margin: 20, backgroundColor: '#fdd835', color: '#000000' }} variant="contained">
                                    Contáctanos
                                </Button>
                            </Link>

                            <Button style={{ margin: 20, backgroundColor: '#fdd835', color: '#000000' }} className="jumbo-button-1" onClick={switchAbierto} >
                                <i className="fa fa-angle-double-up fa-2x" ></i>
                            </Button>
                        </div>

                    </div>
                    <div className="mr-auto col-3">
                        <img className="d-none d-lg-block" height="300" 
                        src={baseFrontUrl + "public/home/DSC_0052BrowserPNG.png"} alt="pipetas_azules"></img>
                    </div>
                </div>
            </div>
            

        );
    
    }
    else{
        return(
            <div className="minijumbotron " >
                <div className="row row-header">
                    <div className="col-6 col-sm-9">
                        <h1>Surgas de Antioquia</h1> 
                    </div>

                    <div className="col-6 col-sm-3 button-container">
                        <Button className="jumbo-button-2" onClick={switchAbierto} style={{ margin: 20, backgroundColor: '#fdd835', color: '#000000' }}>
                            <i className="fa fa-angle-double-down fa-2x" ></i>
                        </Button>
                    </div>
                    
                </div>

            </div>
        );
    }

}

const Vitrina = () => {

    return (


        <div className="container home-container p-5">
            <div className="row">
                <div className="col-12 col-sm-6">
                    
                    <h3>Nuestros productos más vendidos</h3>
                    
                    <h3>Linea industrial. Materias premium</h3>

                </div>
                <div className="ml-auto">
                    <img className="float-right d-none d-md-block" height="150" 
                    src={baseFrontUrl + "public/home/DSC_0018.jpg"} alt="prod1"></img>
                </div>
                <div className="ml-auto">
                    <img className="float-right d-none d-md-block" height="150" 
                    src={baseFrontUrl + "public/home/DSC_0048BrowserPNG.png"} alt="prod2"></img>
                </div>
            </div>
        </div>


    );
};

const Promos = () => {

    return (

        <div className="container home-container p-5">
            <div className="container ">
                <div className="row">
                    
                    <div className="ml-auto">
                        <img className="float-right d-none d-md-block" height="200" 
                        src={baseFrontUrl + "public/home/demo1Puntos.jpg"} alt="puntos"></img>
                    </div>

                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 col-sm-6">
                        
                        <h3>Tips para reducir el consumo</h3>

                    </div>

                    <div className="col-6 col-sm-6">

                        <h3>Pregunta por nuestro sistema de puntos</h3>

                    </div>
                   
                </div>
            </div>
        </div>

    );
};



HomeComponent.propTypes = {};

export default HomeComponent;