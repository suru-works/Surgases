import * as ActionTypes from './ActionTypes';

export const OrderStats = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ORDER_STATS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.ORDER_STATS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ORDER_STATS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.ORDER_STATS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}