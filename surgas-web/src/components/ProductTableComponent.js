import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditProductComponent from './EditProductComponent';

const Product = (props) => {
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

    const toggleEditModal = () => {
        if (isEditProductModalOpen) {
            setIsEditProductModalOpen(false);
        } else {
            setIsEditProductModalOpen(true);
        }
    }

    const getDisponible = () => {
        if (props.product.disponible.data[0] == 1) {
            return(
                "Si"
            );
        } else {
            return(
                "No"
            );
        }
    }
    
    return (
        
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.product.nombre}</th>
                <td>{getDisponible()}</td>
                <td>{props.product.tipo}</td>
                <td>{props.product.color}</td>
                <td>{props.product.peso}</td>
                <td>{props.product.precio}</td>
                <td>{props.product.inventario}</td>
                
                <EditProductComponent product={props.product} isOpen={isEditProductModalOpen} toggle={toggleEditModal}></EditProductComponent>
            </tr>
    );

}

Product.propTypes = {};

export default Product;