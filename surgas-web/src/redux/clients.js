import * as ActionTypes from './ActionTypes';

export const Clients = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.CLIENTS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.CLIENTS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.CLIENTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.CLIENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const ClientsUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.CLIENTS_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.CLIENTS_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.CLIENTS_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.CLIENTS_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const OrderClient = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDER_CLIENT_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDER_CLIENT_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDER_CLIENT_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDER_CLIENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}