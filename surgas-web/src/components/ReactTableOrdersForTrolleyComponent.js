import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


//TO DO, ROBARSE LOS ONCLICK DE LA TABLA DE LOS PRODUCTOS UNA VEZ ESTÉ LISTA

const Tuple = (props) => {
  

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" >
        {props.cellValue}
        





      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" >
        
        



      </div>
    );
  }

}

const ReactTableOrdersForTrolleyComponent = (props) => {

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
      Header: "Cantidad",
      accessor: "cantidad",
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
      defaultPageSize={5}
    >
    </ReactTable>


  );



}

ReactTableOrdersForTrolleyComponent.propTypes = {};

export default ReactTableOrdersForTrolleyComponent;