import * as ActionTypes from './ActionTypes';

export const Maps = (state = {
    isLoading: true,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.MAPS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.MAPS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.MAPS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.MAPS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, result: null};
        default:
            return state;
    }
}