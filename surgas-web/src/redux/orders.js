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

export const OrderUpdateOldOrder = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const OrderUpdateOldOrderProducts = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_PRODUCTS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_PRODUCTS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_PRODUCTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDER_UPDATE_OLD_ORDER_PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const PrintOrder = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRINT_ORDER_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRINT_ORDER_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRINT_ORDER_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRINT_ORDER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}