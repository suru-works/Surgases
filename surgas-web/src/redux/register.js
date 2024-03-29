import * as ActionTypes from './ActionTypes';

export const CheckTel = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.CHECKTEL_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.CHECKTEL_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.CHECKTEL_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.CHECKTEL_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const Register = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.REGISTER_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.REGISTER_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.REGISTER_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.REGISTER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const RegisterClient = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.REGISTERCLIENT_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.REGISTERCLIENT_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.REGISTERCLIENT_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.REGISTERCLIENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}