import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FooterLinksAdmin = () => {
    const result = useSelector(state => state.user.result);
    if (result) {
        if (result.data.administrador == '1') {
            return (

                <ul className="list-unstyled">
                    <li><Link to="/ventas"  style={{color: '#FFFFFF' }} className="link"> Ventas </Link></li>
                    <li><Link to="/administrador"  style={{color: '#FFFFFF' }} className="link"> Administración </Link></li>
                </ul>

            );
        }
        else {
            return (
                <div />
            );
        }
    }
    else {
        return (
            <div></div>
        );
    }


}

const FooterComponent = () => {
    return (
        <div className='footer'>
            <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-sm-2">
                        <h5>Navegar</h5>
                        <ul className="list-unstyled">
                            <li ><Link to="/inicio"  style={{color: '#FFFFFF' }} className="link" > Inicio </Link></li>
                            <li ><Link to="/productos" style={{color: '#FFFFFF' }} className="link"> Productos </Link></li>
                            <li ><Link to="/contacto"  style={{color: '#FFFFFF' }} className="link"> Contáctanos</Link></li>

                            <FooterLinksAdmin />

                        </ul>
                        
                    </div>

                    <div className="col-7 col-sm-5">
                        <h5>Nuestra Dirección</h5>
                        <address>
                            Calle 112 sur # 51 03<br />
                                Caldas, Antioquia<br />
                            <i className="fa fa-phone fa-lg"></i>: 322 39 47<br />
                            <i className="fa fa-mobile fa-lg"></i>: 312 299 44 42<br />
                            <i className="fa fa-envelope fa-lg"></i>: surgasdeantioquia@gmail.com
                        </address>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="text-center">
                            <h5>Conéctate con Nosotros</h5>
                            <br></br>
                            <a className="btn btn-social-icon btn-facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Surgasdeantioquia" style={{ margin: 5 }}><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/surgasdeantioquia/" style={{ margin: 5 }}><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-social-icon btn-google" target="_blank" rel="noopener noreferrer" href="mailto:surgasdeantioquia@gmail.com" style={{ margin: 5 }}><i className="fa fa-envelope-o"></i></a>
                            <a className="btn btn-social-icon btn-whatsapp " aria-hidden="true" rel="noopener noreferrer" target="_blank" href="https://wa.me/573122994442" style={{ margin: 5 }}><i className="fa fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12  ext-center">
                        <p>© 2020 Surgas de Antioquia. todos los derechos reservados.</p>
                        <p>desarrollado por suruworks.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

FooterComponent.propTypes = {};

export default FooterComponent;