import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditOrderComponent from './EditOrderComponent';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const Tuple = (props) => {
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);

  const toggleEditModal = () => {
    if (isEditOrderModalOpen) {
      setIsEditOrderModalOpen(false);
    } else {
      setIsEditOrderModalOpen(true);
    }
  }

  if (props.cellValue) {
    return (
      <div className="row col-12 justify-content-center" onClick={() => toggleEditModal()}>
        {props.cellValue}
        <EditOrderComponent order={props.order} isOpen={isEditOrderModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }
  else {
    return (
      <div className="row col-12 p-2" onClick={() => toggleEditModal()}>
        <EditOrderComponent order={props.order} isOpen={isEditOrderModalOpen} toggle={toggleEditModal} />
      </div>
    );
  }

}

const ReactTableOrdersComponent = (props) => {

  const columns = [

    {
      Header: "Fecha",
      accessor: "fecha",
      style: {
        textAlign: "right"
      },
      width: 250,
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.fecha}></Tuple>
        );
      }
    },
    {
      Header: "#",
      accessor: "numero",
      style: {
        textAlign: "right"
      },
      width: 70,
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.numero}></Tuple>
        );
      }
    },
    {
      Header: "Cliente",
      accessor: "cliente_pedidor",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.cliente_pedidor}></Tuple>
        );
      }
    },
    {
      Header: "Tipo cliente",
      accessor: "tipo_cliente",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.tipo_cliente}></Tuple>
        );
      }
    },
    {
      Header: "Estado",
      accessor: "estado",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.estado}></Tuple>
        );
      }
    },
    {
      Header: "Precio bruto",
      accessor: "precio_bruto",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.precio_bruto}></Tuple>
        );
      }
    },
    {
      Header: "Precio final",
      accessor: "precio_final",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.precio_final}></Tuple>
        );
      }
    },
    {
      Header: "Puntos",
      accessor: "puntos_compra",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.puntos_compra}></Tuple>
        );
      }
    },
    {
      Header: "Direccion",
      accessor: "direccion",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.direccion}></Tuple>
        );
      }
    },
    {
      Header: "Bodega",
      accessor: "bodega",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.bodega}></Tuple>
        );
      }

    },
    {
      Header: "Mensajero",
      accessor: "empleado_despachador",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.empleado_despachador}></Tuple>
        );
      }
    },
    {
      Header: "Hora registro",
      accessor: "hora_registro",
      width: 200,
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.hora_registro}></Tuple>
        );
      }
    },
    {
      Header: "Nota",
      accessor: "nota",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.nota}></Tuple>
        );
      }
    },
    {
      Header: "Registrado por",
      accessor: "usuario_registrador",
      Cell: porps => {
        return (
          <Tuple order={porps.original} cellValue={porps.original.usuario_registrador}></Tuple>
        );
      }
    },

  ]


  return (
    <ReactTable
      keyField="fecha"
      className="-striped -highlight"
      data={props.order}
      filterable
      columns={columns}
      defaultPageSize={20}
    >
    </ReactTable>


  );



}

ReactTableOrdersComponent.propTypes = {};

export default ReactTableOrdersComponent;