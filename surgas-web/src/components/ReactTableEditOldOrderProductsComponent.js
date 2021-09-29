import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import EditOldOrderProductComponent from './EditOldOrderProductComponent';

const ReactTableEditOldOrderProductsComponent = (props) => {

  const [isEditOldOrderProductModalOpen, setIsEditOldOrderProductModalOpen] = useState(false);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState();

  const toggleEditModal = () => {
    
    if (isEditOldOrderProductModalOpen ){
      setSelectedOrderProduct(null);
    }

    setIsEditOldOrderProductModalOpen(!isEditOldOrderProductModalOpen);

  }

  const columns = [

    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 150,
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      width: 150,
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Peso",
      accessor: "peso",
      style: {
        textAlign: "right"
      },
      width: 80,
    },
    {
      Header: "Precio",
      accessor: "precio",
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
    }

  ]


  return (

    <div>
      <EditOldOrderProductComponent updateOldOrderProduct={props.updateOldOrderProduct} deleteOldOrderProduct={props.deleteOldOrderProduct} 
      product={selectedOrderProduct} isOpen={isEditOldOrderProductModalOpen} toggle={toggleEditModal}></EditOldOrderProductComponent>
      <ReactTable
        keyField="codigo"
        className="-striped -highlight"
        data={props.oldOrderProducts}
        filterable
        columns={columns}
        noDataText={"No hay productos en este pedido"}
        defaultPageSize={5}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedOrderProduct(props.original);
                toggleEditModal();
              } catch (error) {
                console.log("No hay nada en esta fila");
              }
            }

            
          }
        }}
      >
      </ReactTable>

    </div>


  );



}

ReactTableEditOldOrderProductsComponent.propTypes = {};

export default ReactTableEditOldOrderProductsComponent;