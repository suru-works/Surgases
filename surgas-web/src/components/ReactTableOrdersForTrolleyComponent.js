import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import EditNewOrderProductComponent from './EditNewOrderProductComponent';

const ReactTableOrdersForTrolleyComponent = (props) => {

  const [isEditNewOrderProductModalOpen, setIsEditNewOrderProductModalOpen] = useState(false);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState();

  const toggleEditModal = () => {
    
    if (isEditNewOrderProductModalOpen ){
      setSelectedOrderProduct(null);
    }

    setIsEditNewOrderProductModalOpen(!isEditNewOrderProductModalOpen);

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
      <EditNewOrderProductComponent updateNewOrderProduct={props.updateNewOrderProduct} deleteNewOrderProduct={props.deleteNewOrderProduct} 
      product={selectedOrderProduct} isOpen={isEditNewOrderProductModalOpen} toggle={toggleEditModal}></EditNewOrderProductComponent>
      <ReactTable
        keyField="codigo"
        className="-striped -highlight"
        data={props.newOrderProducts}
        filterable
        columns={columns}
        noDataText={"Para añadir productos al pedido selecciónelos de la tabla de la derecha"}
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

ReactTableOrdersForTrolleyComponent.propTypes = {};

export default ReactTableOrdersForTrolleyComponent;