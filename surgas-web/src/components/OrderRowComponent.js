import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditOrderComponent from './EditOrderComponent';

const OrderRow = (props) => {
    const [isEditOrderModalOPen, setIsEditOrderModalOPen] = useState(false);

    const toggleEditModal = () => {
        if (isEditOrderModalOPen) {
            setIsEditOrderModalOPen(false);
        } else {
            setIsEditOrderModalOPen(true);
        }
    }
    
    return (
        <tr  onClick={() => toggleEditModal()}>
            <th scope="row">{props.order.fecha}</th>
            <td>{props.order.numero}</td>
            <td>{props.order.hora_registro}</td>
            <td>{props.order.direccion}</td>
            <td>{props.order.precio_bruto}</td>
            <td>{props.order.precio_final}</td>
            <td>{props.order.estado}</td>
            <td>{props.order.bodega}</td>
            <td>{props.order.puntos_compra}</td>
            <td>{props.order.tipo_cliente}</td>
            <td>{props.order.nota}</td>
            <td>{props.order.usuario_registrador}</td>
            <td>{props.order.cliente_pedidor}</td>
            <td>{props.order.empleado_despachador}</td>


            <EditOrderComponent order={props.order} isOpen={isEditOrderModalOPen} toggle={toggleEditModal}></EditOrderComponent>
        </tr>

    );

}

OrderRow.propTypes = {};

export default OrderRow;