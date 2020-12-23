import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditUserModal = () => {
    
}

const User = (props) => {
    const [isEditClientModalOPen, setIsEditClientModalOPen] = useState(false);

    const toggleEditModal = () => {
        if (isEditClientModalOPen) {
            setIsEditClientModalOPen(false);
        } else {
            setIsEditClientModalOPen(true);
        }
    }
    return (
        <div className="container">
            <tr onClick={toggleEditModal()}>
                <th scope="row">{props.user.nick}</th>
                <td>{props.user.nombre}</td>
                <td>{props.user.administrador}</td>
                <td>{props.user.comun}</td>
            </tr>

        </div>
    );

}

User.propTypes = {};

export default User;