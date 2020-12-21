import * as ActionTypes from './ActionTypes';

export const User = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.USER_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.USER_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.USER_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}