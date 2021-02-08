import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditClientComponent from './EditClientComponent';
import { Alert, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {


  const getIsOpen = () => {


    var number;

    (function repeat() {
      number = Math.random();
      setTimeout(repeat, 5000);
    })();

    if (number < 0.1) {
      return (true);
    } else {
      return (false);
    }


    console.log(number, "EL NUMERO RANDOM ES");
    console.log(props.isEditClientModalOpen.find(clientModal => clientModal.id === props.client.telefono).isOpen, "a ber, a ti te hacen find")

  }




  return (
    <div>
      {props.client.telefono}

    </div>
  );
}




const ReactTableClientsComponent = (props) => {

  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState([]);
  const [selectedClient, setSelectedClient] = useState();

  const toggleEditModal = () => {
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
      Header: "Descuento",
      accessor: "descuento",

    },
    {
      Header: "Tipo",
      accessor: "tipo",

    },
    {
      Header: "Fecha último pedido",
      accessor: "fecha_ultimo_pedido",

    },
    {
      Header: "Número último pedido",
      accessor: "numero_ultimo_pedido",

    },
    {
      Header: "Número pedidos",
      accessor: "numero_pedidos",


    },
    {
      Header: "Fecha registro",
      accessor: "fecha_registro",
      width: 200,

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
              console.log('A Td Element was clicked!')
              console.log('it produced this event:', e)
              console.log('It was in this column:', column)
              console.log('DARME LOS DATOS DEL CLIENTE:', props.original)

              //mostrarHoli(props.original)

              setSelectedClient(props.original);

              toggleEditModal();


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