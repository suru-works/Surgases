import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditUserComponent from './EditUserComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  
  return (
    <div className="row col-12 justify-content-center">
      {props.cellValue}
    </div>
  )
}

const ReactTableUsersComponent = (props) => {

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const toggleEditModal = () => {

    if (isEditUserModalOpen ){
      setSelectedUser(null);
    }

    setIsEditUserModalOpen(!isEditUserModalOpen);
  }

  const getVerificado = (verificado) => {
    if (verificado.data[0] == 1) {
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
      Header: "Usuario",
      accessor: "username",
      style: {
        textAlign: "right"
      },
      width: 250,
    },
    {
      Header: "Email",
      accessor: "email",
      style: {
        textAlign: "right"
      },
      width: 300,
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
    },
    {
      Header: "Tipo",
      accessor: "tipo",
      style: {
        textAlign: "right"
      },
    },
    {
      Header: "Verificado",
      accessor: "verificado",
      style: {
        textAlign: "right"
      },
      width: 80,
      Cell: porps => {
        return (
          <Tuple user={porps.original} cellValue={getVerificado(porps.original.verificado)}></Tuple>
        );
      }
    }

  ]


  return (
    <div>
      <EditUserComponent user={selectedUser} isOpen={isEditUserModalOpen} toggle={toggleEditModal} />
      <ReactTable
        keyField="username"
        className="-striped -highlight"
        data={props.users}
        filterable
        columns={columns}
        defaultPageSize={20}

        getTdProps={(column, props) => {
          return {
            onClick: (e) => {
              try {
                setSelectedUser(props.original);
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

ReactTableUsersComponent.propTypes = {};

export default ReactTableUsersComponent;