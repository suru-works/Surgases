import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditProductComponent from './EditProductComponent';

const Product = (props) => {
    const [isEditClientModalOPen, setIsEditClientModalOPen] = useState(false);

    const toggleEditModal = () => {
        if (isEditClientModalOPen) {
            setIsEditClientModalOPen(false);
        } else {
            setIsEditClientModalOPen(true);
        }
    }
    
    return (
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.product.productname}</th>
                <td>{props.product.codigo}</td>
                <td>{props.product.nombre}</td>
                <td>{props.product.color}</td>
                <td>{props.product.pesoMinimo}</td>
                <td>{props.product.pesoMaximo}</td>
                <td>{props.product.tipo}</td>
                <td>{props.product.pesoMinimo}</td>
                <td>{props.product.pesoMaximo}</td>

                <EditProductComponent product={props.product} isOpen={isEditClientModalOPen} toggle={toggleEditModal}></EditProductComponent>
            </tr>
    );

}

Product.propTypes = {};

export default Product;