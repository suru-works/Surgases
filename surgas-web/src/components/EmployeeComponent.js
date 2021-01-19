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
                <th scope="row">{props.employee.employeename}</th>
                <td>{props.employee.nombre}</td>
                <td>{props.employee.email}</td>
                <td>{props.employee.tipo}</td>
                <EditEmployeeComponent employee={props.employee} isOpen={isEditEmployeeModalOPen} toggle={toggleEditModal}></EditEmployeeComponent>
            </tr>
    );

}

Employee.propTypes = {};

export default Employee;