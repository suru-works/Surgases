import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import EditNewOrderProductComponent from './EditNewOrderProductComponent';


//TO DO, ROBARSE LOS ONCLICK DE LA TABLA DE LOS PRODUCTOS UNA VEZ ESTÉ LISTA


const Tuple = (props) => {

  const [isEditNewOrderProductModalOpen, setIsEditNewOrderProductModalOpen] = useState(false);

  const toggleEditNewOrderProductModal = () => {
      if (isEditNewOrderProductModalOpen) {
          setIsEditNewOrderProductModalOpen(false);
      } else {
          setIsEditNewOrderProductModalOpen(true);
      }
  }
  

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditNewOrderProductModal()}>
        {props.cellValue}
        
        <EditNewOrderProductComponent updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} product={props.product} isOpen={isEditNewOrderProductModalOpen} toggle={toggleEditNewOrderProductModal}></EditNewOrderProductComponent>




      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditNewOrderProductModal()}>
        
        <EditNewOrderProductComponent updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} product={props.product} isOpen={isEditNewOrderProductModalOpen} toggle={toggleEditNewOrderProductModal}></EditNewOrderProductComponent>



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
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 150,
      Cell: porps => {
        return (
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.tipo}></Tuple>
        );
      }
    },
    {
      Header: "Color",
      accessor: "color",
      Cell: porps => {
        return (
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.color}></Tuple>
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
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.peso}></Tuple>
        );
      }
    },
    {
      Header: "Precio",
      accessor: "precio",
      Cell: porps => {
        return (
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.precio}></Tuple>
        );
      }
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
      Cell: porps => {
        return (
          <Tuple product={porps.original} updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} cellValue={porps.original.cantidad}></Tuple>
        );
      }
    }

  ]


  return (
    <ReactTable
      keyField="codigo"
      className="-striped -highlight"
      data={props.newOrderProducts}
      filterable
      columns={columns}
      noDataText={"Para añadir productos al pedido selecciónelos de la tabla de la derecha"}
      defaultPageSize={5}
    >
    </ReactTable>


  );



}

ReactTableOrdersForTrolleyComponent.propTypes = {};

export default ReactTableOrdersForTrolleyComponent;