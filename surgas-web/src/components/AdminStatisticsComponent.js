import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { orderStats } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line } from 'recharts';

const OrderStats = (props) => {
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
            <LineChart
                width={props.width}
                height={props.width / 2}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                data={[{ x: '2020-01-01', y: 0 }, { x: '2020-01-02', y: 1 }, { x: '2020-01-03', y: 2 }, { x: '2020-01-04', y: 3 }]}
            >
                <XAxis dataKey='x' />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="y" stroke="#0000ff" yAxisId={0} />
            </LineChart>
        );
    }
    return (
        <div></div>
    );
}

const AdminStatistics = () => {
    const cardRef = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(cardRef.current.offsetWidth * 0.9);
    }, [cardRef]);

    return (
        <div className='col' ref={cardRef}>
            <Card style={{ margin: "10px", padding: "7px" }}>
                <CardTitle tag='h3'>Estad&iacute;sticas</CardTitle>
                <CardBody>
                    <OrderStats width={width} />
                </CardBody>
            </Card>
        </div>
    );
}

AdminStatistics.propTypes = {};
export default AdminStatistics;