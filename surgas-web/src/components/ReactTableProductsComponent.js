import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditProductComponent from './EditProductComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {

  return (
    <div className="row col-12 justify-content-center" >
      {props.cellValue}
      
    </div>
  )

}

const ReactTableProductsComponent = (props) => {

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const toggleEditModal = () => {

    if (isEditProductModalOpen ){
      setSelectedProduct(null);
    }

    setIsEditProductModalOpen(!isEditProductModalOpen);
  }


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
      Header: "Codigo",
      accessor: "codigo",
      style: {
        textAlign: "right"
      },
      width: 70,
      
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
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
      Header: "Tipo",
      accessor: "tipo",
      
    },
    {
      Header: "Precio",
      accessor: "precio",
      
    },
    {
      Header: "Inventario",
      accessor: "inventario",
      
    },
    {
      Header: "Disponible",
      accessor: "disponible",
      style: {
        textAlign: "right"
      },
      width: 100,
      Cell: porps => {
        return (
          <Tuple product={porps.original} cellValue={getDisponible(porps.original.disponible)}></Tuple>
        );
      }
    }

  ]


  return (
    <div>   
      <EditProductComponent product={selectedProduct} isOpen={isEditProductModalOpen} toggle={toggleEditModal} />
      <ReactTable
        keyField="codigo"
        className="-striped -highlight"
        data={props.products}
        filterable
        columns={columns}
        defaultPageSize={20}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedProduct(props.original);
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

ReactTableProductsComponent.propTypes = {};

export default ReactTableProductsComponent;