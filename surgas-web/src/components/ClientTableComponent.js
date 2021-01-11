import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditClientComponent from './EditClientComponent';

const Client = (props) => {
    const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);

    const toggleEditModal = () => {
        if (isEditClientModalOpen) {
            setIsEditClientModalOpen(false);
        } else {
            setIsEditClientModalOpen(true);
        }
    }
    
    return (
        
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.client.nombre}</th>
                <td>{props.client.telefono}</td>
                <td>{props.client.email}</td>
                <td>{props.client.fecha_registro}</td>
                <td>{props.client.puntos}</td>
                <td>{props.client.descuento}</td>
                <td>{props.client.tipo}</td>
                <td>{props.client.fecha_ultimo_pedido}</td>
                <td>{props.client.numero_ultimo_pedido}</td>
                <td>{props.client.numero_pedidos}</td>

                <EditClientComponent client={props.client} isOpen={isEditClientModalOpen} toggle={toggleEditModal} />
            </tr>
    );

}

Client.propTypes = {};

export default Client;