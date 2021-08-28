import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditEmployeeComponent from './EditEmployeeComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


const ReactTableEmployeesComponent = (props) => {

  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const toggleEditModal = () => {

    if (isEditEmployeeModalOpen ){
      setSelectedEmployee(null);
    }

    setIsEditEmployeeModalOpen(!isEditEmployeeModalOpen);
  }

  const columns = [

    {
      Header: "Id",
      accessor: "id",
      style: {
        textAlign: "right"
      },
      width: 150,
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      width: 200,
    },
    {
      Header: "Telefono",
      accessor: "telefono",
      style: {
        textAlign: "right"
      },
      width: 150,
    },
    {
      Header: "Direccion",
      accessor: "direccion",
      style: {
        textAlign: "right"
      },
      width: 200,
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      style: {
        textAlign: "right"
      },
      width: 220,
    },
    {
      Header: "Estado",
      accessor: "estado",
      style: {
        textAlign: "right"
      },
      width: 100,
    },
  ]

  return (

    <div>
      <EditEmployeeComponent employee={selectedEmployee} isOpen={isEditEmployeeModalOpen} toggle={toggleEditModal} />
      <ReactTable
        keyField="id"
        className="-striped -highlight"
        data={props.employees}
        filterable
        columns={columns}
        defaultPageSize={20}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedEmployee(props.original);
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

ReactTableEmployeesComponent.propTypes = {};

export default ReactTableEmployeesComponent;