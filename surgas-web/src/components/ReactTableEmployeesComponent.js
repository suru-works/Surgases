import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditEmployeeComponent from './EditEmployeeComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);

  const toggleEditModal = () => {
    if (isEditEmployeeModalOpen) {
      setIsEditEmployeeModalOpen(false);
    } else {
      setIsEditEmployeeModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditModal()}>
        {props.cellValue}
        <EditEmployeeComponent employee={props.employee} isOpen={isEditEmployeeModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditModal()}>
        <EditEmployeeComponent employee={props.employee} isOpen={isEditEmployeeModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }

}

const ReactTableEmployeesComponent = (props) => {

  const columns = [

    {
      Header: "Id",
      accessor: "id",
      style: {
        textAlign: "right"
      },
      width: 150,
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.id}></Tuple>
        );
      }
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 200,
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Telefono",
      accessor: "telefono",
      style: {
        textAlign: "right"
      },
      width: 150,
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.telefono}></Tuple>
        );
      }
    },
    {
      Header: "Direccion",
      accessor: "direccion",
      style: {
        textAlign: "right"
      },
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.direccion}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      style: {
        textAlign: "right"
      },
      width: 120,
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.tipo}></Tuple>
        );
      }
    },
    {
      Header: "Estado",
      accessor: "estado",
      style: {
        textAlign: "right"
      },
      width: 100,
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.estado}></Tuple>
        );
      }
    },
    {
      Header: "Usuario",
      accessor: "username",
      style: {
        textAlign: "right"
      },
      Cell: porps => {
        return (
          <Tuple employee={porps.original} cellValue={porps.original.username}></Tuple>
        );
      }
    },

  ]


  return (
    <ReactTable
      keyField="id"
      className="-striped -highlight"
      data={props.employees}
      filterable
      columns={columns}
      defaultPageSize={20}
    >
    </ReactTable>


  );



}

ReactTableEmployeesComponent.propTypes = {};

export default ReactTableEmployeesComponent;