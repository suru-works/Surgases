import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import AddNewOrderProductComponent from './AddNewOrderProductComponent';
import EditProductComponent from './EditProductComponent';

const ReactTableProductsForTrolleyComponent = (props) => {

  const [isAddNewOrderModalOpen, setIsAddNewOrderModalOpen] = useState(false);
  const [selectedNewProduct, setSelectedNewProduct] = useState();

  const toggleEditModal = () => {

    if (isAddNewOrderModalOpen ){
      setSelectedNewProduct(null);
    }

    setIsAddNewOrderModalOpen(!isAddNewOrderModalOpen);
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
      Header: "Inventario",
      accessor: "inventario",
    }
  ]


  return (
    <div>
      <AddNewOrderProductComponent addNewOrderProduct={props.addNewOrderProduct} product={selectedNewProduct} isOpen={isAddNewOrderModalOpen} toggle={toggleEditModal}></AddNewOrderProductComponent>
      <ReactTable
        keyField="codigo"
        className="-striped -highlight"
        data={props.products}
        filterable
        columns={columns}
        defaultPageSize={10}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedNewProduct(props.original);
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

ReactTableProductsForTrolleyComponent.propTypes = {};

export default ReactTableProductsForTrolleyComponent;