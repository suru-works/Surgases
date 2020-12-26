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
    const tipo = (user) =>{
        if(user.administrador == '1'){
            return(
                "administrador"
            );
        }
        else if (user.comun === '1'){
            return(
                "comun"
            );
        }
        else{
            return(
                "sin definir"
            );
        }
    }
    
    return (
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.user.nick}</th>
                <td>{props.user.nombre}</td>
                <td>{props.user.email}</td>
                <td>{tipo(props.user)}</td>
                <EditUserComponent user={props.user} isOpen={isEditClientModalOPen} toggle={toggleEditModal}></EditUserComponent>
            </tr>
    );

}

User.propTypes = {};

export default User;