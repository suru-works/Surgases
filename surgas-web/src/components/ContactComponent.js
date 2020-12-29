import React, { Component, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Label, Col, Card, CardBody, CardText, CardHeader, UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Map from './MapComponent';
import { baseFrontUrl } from '../shared/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import { Loading } from './LoadingComponent';

import {maps} from '../redux/ActionCreators';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);



const RenderMap = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(maps());
    }, []);


    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=`;


    const error = useSelector(state => state.maps.errMess);
    const result = useSelector(state => state.maps.result);
    const loading = useSelector(state => state.maps.isLoading);

    if (error) {
        return (
            <label>Error cargando el mapa</label>
        );

    }
    else if (loading) {
        return (
            <Loading></Loading>
        );

    }
    else if (result) {
        return (


            <Map zoom={15} center={{ lat: 6.182236, lng: -75.5735974 }}
                withMarker={true}
                googleMapURL={mapUrl + `${result.data.key}`}
                containerElement={<div style={{ height: `400px`, width: `auto` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapType='roadmap'
                loadingElement={<Loading />}

            />


        );
    }
    else {
        return (
            <div></div>
        );
    }

}



const Contact = () => {
    return(
        <div>
            <br></br>
            <br></br>
            <Personal />
            <br></br>
            <br></br>
        </div>
    );
}

const Personal = () => {

    return (


            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        
                        <h3>Nuestros personal es el mejor del área metropolitana </h3>
                        <br></br>
                        <h3>Servicio garantizado </h3>

                    </div>

                    <div className="ml-auto">
                        <img className="float-right d-none d-md-block" height="150" 
                        src={baseFrontUrl + "public/contactanos/DSC_0133.jpg"} alt="personal"></img>
                    </div>
                </div>
            </div>


    );
};

export default Contact;