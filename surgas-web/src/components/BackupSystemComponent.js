import Label from "reactstrap/lib/Label";

const BackupSystem = () => {

    const error = useSelector(state => state.systemBackup.errMess);
    const result = useSelector(state => state.systemBackup.result);
    const loading = useSelector(state => state.systemBackup.isLoading);

    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        );
    }
    else if (error) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Hubo un error.</p>
                </ModalBody>
            </Modal>
        );
    }
    else if (result) {
        return (
            <Modal isOpen={props.isOpen} toggle={toogleAndReset}>
                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>
                <ModalBody>
                    <p>Sistema respaldado correctamente.</p>
                </ModalBody>
                <Button onClick={toogleAndReset}>Aceptar</Button>
            </Modal>
        );
    }
    else {
        return (

            <Modal className="modal-lg" isOpen={props.isOpen} toggle={props.toggle}>

                <ModalHeader toggle={toogleAndReset}>Respaldar el sistema</ModalHeader>

                <ModalBody>

                    <div className="d-flex space-around row">
                        <div class="d-flex justify-content-center" >
                            <Label>Esta seguro que desea respaldar los datos del sistema?</Label>
                            <Label>Una vez respaldados los datos, se subira una copia con la fecha actual a google drive.</Label>
                            <Button className="secondary-button" type="submit" value="submit"  >Actualizar</Button>
                        </div>

                    </div>

                </ModalBody>
            </Modal>


        );
    }
}

export default BackupSystem;