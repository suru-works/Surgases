import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditProductComponent from './EditProductComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const toggleEditModal = () => {
    if (isEditProductModalOpen) {
      setIsEditProductModalOpen(false);
    } else {
      setIsEditProductModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditModal()}>
        {props.cellValue}
        <EditProductComponent product={props.product} isOpen={isEditProductModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditModal()}>
        <EditProductComponent product={props.product} isOpen={isEditProductModalOpen} toggle={toggleEditModal} />
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
          <Tuple product={porps.original} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 150,
      Cell: porps => {
        return (
          <Tuple product={porps.original} cellValue={porps.original.tipo}></Tuple>
        );
      }
    },
    {
      Header: "Color",
      accessor: "color",
      Cell: porps => {
        return (
          <Tuple product={porps.original} cellValue={porps.original.color}></Tuple>
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
          <Tuple product={porps.original} cellValue={porps.original.peso}></Tuple>
        );
      }
    },
    {
      Header: "Precio",
      accessor: "precio",
      Cell: porps => {
        return (
          <Tuple product={porps.original} cellValue={porps.original.precio}></Tuple>
        );
      }
    },
    {
      Header: "Inventario",
      accessor: "inventario",
      Cell: porps => {
        return (
          <Tuple product={porps.original} cellValue={porps.original.inventario}></Tuple>
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