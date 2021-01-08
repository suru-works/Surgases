import React from 'react';
import PropTypes from 'prop-types';

import ProductsAdministration from './ProductsAdministrationComponent';
const ProductsSearch = () => {
    return (
        <ProductsAdministration ventas={true}></ProductsAdministration>
    );
}


ProductsSearch.propTypes = {};

export default ProductsSearch;