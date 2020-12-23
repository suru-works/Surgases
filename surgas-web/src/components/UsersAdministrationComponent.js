import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, Table, Card } from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import CardBody from 'reactstrap/lib/CardBody';
import { Loading } from './LoadingComponent';
import  User  from './UserComponent';
import { useSelector, useDispatch } from 'react-redux';
import { users } from '../redux/ActionCreators';

const RenderSearchResultTuple = (props) => {
    const user = props.user;
    return (
        <User user={user}/>
    );
}

const SearchResult = () => {

    const error = useSelector(state => state.users.errMess);
    const result = useSelector(state => state.users.result);
    const loading = useSelector(state => state.users.isLoading);

    const dispatch = useDispatch();
    /* useEffect(() => {
        dispatch(users());
    },[result]); */

    if (loading) {
        return (
            <Loading />
        );

    }
    if (result) {
        const ResultTuples = result.data.map((user) => {
            return (
                <RenderSearchResultTuple user={user} key={user.nick}></RenderSearchResultTuple>

            );
        })
        return (
            <Table className='col' responsive={true} bordered striped   >
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Administrador</th>
                        <th>Comun</th>
                    </tr>
                </thead>
                <tbody>
                    {ResultTuples}
                </tbody>
            </Table>
        );
    }
    if (error) {
        return (
            <div> hubo un error</div>
        );

    }
    return (
        <div></div>
    );

}

const UsersAdministration = () => {    

    return (
        <div className='col'>
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Criterios de busqueda</CardText>
                </CardTitle>
                <CardBody>
                </CardBody>
            </Card>
            <Card className='col-9 '>
                <CardTitle>
                    <CardText>Usuarios</CardText>
                </CardTitle>
                <CardBody>
                    <SearchResult></SearchResult>
                </CardBody>
            </Card>
        </div>

    );
}


UsersAdministration.propTypes = {};

export default UsersAdministration;