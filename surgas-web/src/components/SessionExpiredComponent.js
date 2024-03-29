import React from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';


const SessionExpiredComponent = (props) => {

    const toggleAndDeleteTokenInfo = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("username");
        props.toggle();
    }

    return (
        <Modal isOpen={props.isOpen} toggle={toggleAndDeleteTokenInfo}>
            <ModalHeader toggle={toggleAndDeleteTokenInfo}>Salir</ModalHeader>
            <ModalBody>
                <p>Hubo un error, pues tu sesion ya estaba vencida</p>
                <p>inicia sesion de nuevo.</p>
            </ModalBody>
        </Modal>
    );
};

SessionExpiredComponent.propTypes = {};

export default SessionExpiredComponent;