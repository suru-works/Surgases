import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditPrinterComponent from './EditPrinterComponent';

const Printer = (props) => {
    const [isEditPrinterModalOPen, setIsEditPrinterModalOPen] = useState(false);

    const toggleEditModal = () => {
        if (isEditPrinterModalOPen) {
            setIsEditPrinterModalOPen(false);
        } else {
            setIsEditPrinterModalOPen(true);
        }
    }
    
    return (
            <tr  onClick={() => toggleEditModal()}>
                <th scope="row">{props.printer.codigo}</th>
                <td>{props.printer.descripcion}</td>
                <EditPrinterComponent printer={props.printer} isOpen={isEditPrinterModalOPen} toggle={toggleEditModal}></EditPrinterComponent>
            </tr>
    );

}

Printer.propTypes = {};

export default Printer;