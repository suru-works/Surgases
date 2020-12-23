import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.USERS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.USERS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.USERS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}