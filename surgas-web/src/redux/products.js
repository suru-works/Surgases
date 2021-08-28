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

export const TrolleyProducts = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.TROLLEY_PRODUCTS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.TROLLEY_PRODUCTS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.TROLLEY_PRODUCTS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.TROLLEY_PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const LastProductPrice = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LAST_PRODUCT_PRICE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.LAST_PRODUCT_PRICE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.LAST_PRODUCT_PRICE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.LAST_PRODUCT_PRICE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const Productoxcliente = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRODUCTOXCLIENTE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRODUCTOXCLIENTE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRODUCTOXCLIENTE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRODUCTOXCLIENTE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}