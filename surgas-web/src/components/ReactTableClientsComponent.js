import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditClientComponent from './EditClientComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);

  const toggleEditModal = () => {
    if (isEditClientModalOpen) {
      setIsEditClientModalOpen(false);
    } else {
      setIsEditClientModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditModal()}>
        {props.cellValue}
        <EditClientComponent client={props.client} isOpen={isEditClientModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditModal()}>
        <EditClientComponent client={props.client} isOpen={isEditClientModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }

}

const ReactTableClientsComponent = (props) => {

  const columns = [

    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 200,
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Teléfono",
      accessor: "telefono",
      style: {
        textAlign: "right"
      },
      width: 100,
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.telefono}></Tuple>
        );
      }
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.email}></Tuple>
        );
      }
    },
    {
      Header: "Puntos",
      accessor: "puntos",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.puntos}></Tuple>
        );
      }
    },
    {
      Header: "Descuento",
      accessor: "descuento",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.descuento}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.tipo}></Tuple>
        );
      }
    },
    {
      Header: "Fecha último pedido",
      accessor: "fecha_ultimo_pedido",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.fecha_ultimo_pedido}></Tuple>
        );
      }
    },
    {
      Header: "Número último pedido",
      accessor: "numero_ultimo_pedido",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.numero_ultimo_pedido}></Tuple>
        );
      }
    },
    {
      Header: "Número pedidos",
      accessor: "numero_pedidos",
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.numero_pedidos}></Tuple>
        );
      }

    },
    {
      Header: "Fecha registro",
      accessor: "fecha_registro",
      width: 200,
      Cell: porps => {
        return (
          <Tuple client={porps.original} cellValue={porps.original.fecha_registro}></Tuple>
        );
      }
    }

  ]


  return (
    <ReactTable
      keyField="telefono"
      className="-striped -highlight"
      data={props.client}
      filterable
      columns={columns}
      defaultPageSize={20}
    >
    </ReactTable>


  );



}

ReactTableClientsComponent.propTypes = {};

export default ReactTableClientsComponent;