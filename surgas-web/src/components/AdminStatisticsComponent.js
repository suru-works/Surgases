import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { orderStats } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

const OrderStats = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderStats());
    }, []);

    const loading = useSelector(state => state.orderStats.loading);
    const result = useSelector(state => state.orderStats.result);
    const error = useSelector(state => state.orderStats.errMess);

    if (loading) {
        return (
            <Loading />
        );
    }
    if (error) {
        return (
            <div>Hubo un error</div>
        );
    }
    if (result) {
        return (
            <ResponsiveContainer width='100%' height={400}>
                <LineChart
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    data={[{ x: '2020-01-01', y: 0 }, { x: '2020-01-02', y: 1 }, { x: '2020-01-03', y: 2 }, { x: '2020-01-04', y: 3 }]}
                >
                    <XAxis dataKey='x' />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="y" stroke="#0000ff" yAxisId={0} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
    return (
        <div></div>
    );
}

const AdminStatistics = () => {
    return (
        <div className='col'>
            <Card style={{ margin: "10px", padding: "7px" }}>
                <CardTitle tag='h3'>Estad&iacute;sticas</CardTitle>
                <CardBody>
                    <OrderStats />
                </CardBody>
            </Card>
        </div>
    );
}

AdminStatistics.propTypes = {};
export default AdminStatistics;