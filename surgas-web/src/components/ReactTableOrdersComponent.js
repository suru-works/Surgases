import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditOrderComponent from './EditOrderComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const ReactTableOrdersComponent = (props) => {

  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const toggleEditModal = () => {

    if (isEditOrderModalOpen ){
      setSelectedOrder(null);
    }

    setIsEditOrderModalOpen(!isEditOrderModalOpen);
  }

  const columns = [

    {
      Header: "Fecha",
      accessor: "fecha",
      style: {
        textAlign: "right"
      },
      width: 250,
    },
    {
      Header: "#",
      accessor: "numero",
      style: {
        textAlign: "right"
      },
      width: 70,
    },
    {
      Header: "Cliente",
      accessor: "cliente_pedidor",
    },
    {
      Header: "Tipo cliente",
      accessor: "tipo_cliente",
    },
    {
      Header: "Estado",
      accessor: "estado",
    },
    {
      Header: "Precio bruto",
      accessor: "precio_bruto",
    },
    {
      Header: "Precio final",
      accessor: "precio_final",
    },
    {
      Header: "Puntos",
      accessor: "puntos_compra",
    },
    {
      Header: "Direccion",
      accessor: "direccion",
    },
    {
      Header: "Bodega",
      accessor: "bodega",
    },
    {
      Header: "Mensajero",
      accessor: "empleado_despachador",
    },
    {
      Header: "Hora registro",
      accessor: "hora_registro",
      width: 200,
    },
    {
      Header: "Nota",
      accessor: "nota",
    },
    {
      Header: "Registrado por",
      accessor: "usuario_registrador",
    },
  ]

  return (
    <div>
      <EditOrderComponent order={selectedOrder} isOpen={isEditOrderModalOpen} toggle={toggleEditModal} />
      <ReactTable
        keyField="fecha"
        className="-striped -highlight"
        data={props.order}
        filterable
        columns={columns}
        defaultPageSize={20}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedOrder(props.original);
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

ReactTableOrdersComponent.propTypes = {};

export default ReactTableOrdersComponent;