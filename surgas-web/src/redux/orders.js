import * as ActionTypes from './ActionTypes';

export const Orders = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDERS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDERS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDERS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
export const OrdersUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDERS_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDERS_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDERS_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDERS_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}