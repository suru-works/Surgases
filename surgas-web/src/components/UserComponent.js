import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditUserComponent from './EditUserComponent';

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
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.user.username}</th>
                <td>{props.user.email}</td>
                <td>{props.user.tipo}</td>
                <EditUserComponent user={props.user} isOpen={isEditClientModalOPen} toggle={toggleEditModal}></EditUserComponent>
            </tr>
    );

}

User.propTypes = {};

export default User;