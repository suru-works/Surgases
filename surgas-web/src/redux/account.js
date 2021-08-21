import * as ActionTypes from './ActionTypes';
export const Account = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_DATA_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.GET_ACCOUNT_DATA_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.GET_ACCOUNT_DATA_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.GET_ACCOUNT_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
export const AccountUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ACCOUNT_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ACCOUNT_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ACCOUNT_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ACCOUNT_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}