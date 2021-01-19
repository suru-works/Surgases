import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditEmployeeComponent from './EditEmployeeComponent';

const Employee = (props) => {
    const [isEditEmployeeModalOPen, setIsEditEmployeeModalOPen] = useState(false);

    const toggleEditModal = () => {
        if (isEditEmployeeModalOPen) {
            setIsEditEmployeeModalOPen(false);
        } else {
            setIsEditEmployeeModalOPen(true);
        }
    }
    
    return (
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.employee.id}</th>
                <td>{props.employee.nombre}</td>
                <td>{props.employee.direccion}</td>
                <td>{props.employee.telefono}</td>
                <td>{props.employee.estado}</td>
                <td>{props.employee.tipo}</td>
                <td>{props.employee.username}</td>
                <EditEmployeeComponent employee={props.employee} isOpen={isEditEmployeeModalOPen} toggle={toggleEditModal}></EditEmployeeComponent>
            </tr>
    );

}

Employee.propTypes = {};

export default Employee;