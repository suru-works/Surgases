import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import AddNewOrderProductComponent from './AddNewOrderProductComponent';
import EditProductComponent from './EditProductComponent';

const Tuple = (props) => {


  //TO DO, CAMBIAR ESTE MODAL EL IMPORTAR EL MODAL CORRECTO, MODIFICAR LOS ONCLICK 
  const [isAddNewOrderModalOpen, setIsAddNewOrderModalOpen] = useState(false);

  const toggleAddNewOrderProductModal = () => {
    if (isAddNewOrderModalOpen) {
        setIsAddNewOrderModalOpen(false);
    } else {
        setIsAddNewOrderModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleAddNewOrderProductModal()}>
        {props.cellValue}

        <AddNewOrderProductComponent addNewOrderProduct={props.addNewOrderProduct} product={props.product} isOpen={isAddNewOrderModalOpen} toggle={toggleAddNewOrderProductModal}></AddNewOrderProductComponent>

        





      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleAddNewOrderProductModal()}>
        
        <AddNewOrderProductComponent addNewOrderProduct={props.addNewOrderProduct} product={props.product} isOpen={isAddNewOrderModalOpen} toggle={toggleAddNewOrderProductModal}></AddNewOrderProductComponent>



      </div>
    );
  }

}

const ReactTableProductsForTrolleyComponent = (props) => {
  const getDisponible = (disponible) => {
    if (disponible.data[0] == 1) {
        return(
            "Si"
        );
    } else {
        return(
            "No"
        );
    }
}

  const columns = [

    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 150,
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct} product={porps.original} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 150,
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct} product={porps.original} cellValue={porps.original.tipo}></Tuple>
        );
      }
    },
    {
      Header: "Color",
      accessor: "color",
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct} product={porps.original} cellValue={porps.original.color}></Tuple>
        );
      }
    },
    {
      Header: "Peso",
      accessor: "peso",
      style: {
        textAlign: "right"
      },
      width: 80,
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct} product={porps.original} cellValue={porps.original.peso}></Tuple>
        );
      }
    },
    {
      Header: "Precio",
      accessor: "precio",
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct}  product={porps.original} cellValue={porps.original.precio}></Tuple>
        );
      }
    },
    {
      Header: "Inventario",
      accessor: "inventario",
      Cell: porps => {
        return (
          <Tuple addNewOrderProduct={props.addNewOrderProduct} product={porps.original} cellValue={porps.original.inventario}></Tuple>
        );
      }
    }

  ]


  return (
    <ReactTable
      keyField="codigo"
      className="-striped -highlight"
      data={props.products}
      filterable
      columns={columns}
      defaultPageSize={10}
    >
    </ReactTable>


  );



}

ReactTableProductsForTrolleyComponent.propTypes = {};

export default ReactTableProductsForTrolleyComponent;