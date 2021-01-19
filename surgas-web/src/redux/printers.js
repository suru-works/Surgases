import * as ActionTypes from './ActionTypes';

export const Printers = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRINTERS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRINTERS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRINTERS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRINTERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const PrintersUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.PRINTERS_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.PRINTERS_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.PRINTERS_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.PRINTERS_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

