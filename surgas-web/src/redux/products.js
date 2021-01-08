import * as ActionTypes from './ActionTypes';

export const Products = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRODUCTS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRODUCTS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRODUCTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
export const ProductsUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRODUCTS_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRODUCTS_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRODUCTS_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRODUCTS_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
