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