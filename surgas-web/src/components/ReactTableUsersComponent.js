import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditUserComponent from './EditUserComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const toggleEditModal = () => {
    if (isEditUserModalOpen) {
      setIsEditUserModalOpen(false);
    } else {
      setIsEditUserModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditModal()}>
        {props.cellValue}
        <EditUserComponent user={props.user} isOpen={isEditUserModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditModal()}>
        <EditUserComponent user={props.user} isOpen={isEditUserModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }

}

const ReactTableUsersComponent = (props) => {
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
      Cell: porps => {
        return (
          <Tuple user={porps.original} cellValue={porps.original.username}></Tuple>
        );
      }
    },
    {
      Header: "Email",
      accessor: "email",
      style: {
        textAlign: "right"
      },
      width: 300,
      Cell: porps => {
        return (
          <Tuple user={porps.original} cellValue={porps.original.email}></Tuple>
        );
      }
    },
    {
      Header: "Nombre",
      accessor: "nombre",
      style: {
        textAlign: "right"
      },
      Cell: porps => {
        return (
          <Tuple user={porps.original} cellValue={porps.original.nombre}></Tuple>
        );
      }
    },
    {
      Header: "Tipo",
      accessor: "ripo",
      style: {
        textAlign: "right"
      },
      Cell: porps => {
        return (
          <Tuple user={porps.original} cellValue={porps.original.tipo}></Tuple>
        );
      }
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
    <ReactTable
      keyField="username"
      className="-striped -highlight"
      data={props.users}
      filterable
      columns={columns}
      defaultPageSize={20}
    >
    </ReactTable>


  );



}

ReactTableUsersComponent.propTypes = {};

export default ReactTableUsersComponent;