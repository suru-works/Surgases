import * as ActionTypes from './ActionTypes';

export const Verify = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.VERIFY_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.VERIFY_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.VERIFY_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.VERIFY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
