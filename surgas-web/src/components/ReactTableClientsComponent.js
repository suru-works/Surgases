import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditClientComponent from './EditClientComponent';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const ReactTableClientsComponent = (props) => {

  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState();

  const toggleEditModal = () => {

    if (isEditClientModalOpen ){
      setSelectedClient(null);
    }

    setIsEditClientModalOpen(!isEditClientModalOpen);
 }

  const columns = [

    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 200,

    },
    {
      Header: "Teléfono",
      accessor: "telefono",
      style: {
        textAlign: "right"
      },
      width: 100,

    },
    {
      Header: "Email",
      accessor: "email",

    },
    {
      Header: "Puntos",
      accessor: "puntos",

    },
    {
      Header: "Tipo",
      accessor: "tipo",

    },
    {
      Header: "Número pedidos",
      accessor: "numero_pedidos",

    },
    {
      Header: "Fecha registro",
      accessor: "fecha_registro",
      width: 200,

    },
    {
      Header: "Fecha último pedido",
      accessor: "fecha_ultimo_pedido",

    },
    {
      Header: "Número último pedido",
      accessor: "numero_ultimo_pedido",

    }
  ]

  return (
    <div>
      <EditClientComponent client={selectedClient} isOpen={isEditClientModalOpen} toggle={toggleEditModal} />
      <ReactTable
        keyField="telefono"
        className="-striped -highlight"
        data={props.client}
        filterable
        columns={columns}
        defaultPageSize={20}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedClient(props.original);
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

ReactTableClientsComponent.propTypes = {};

export default ReactTableClientsComponent;