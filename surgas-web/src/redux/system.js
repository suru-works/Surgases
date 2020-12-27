import * as ActionTypes from './ActionTypes';

export const SystemParameters = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.SYSTEM_PARAMETERS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.SYSTEM_PARAMETERS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.SYSTEM_PARAMETERS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.SYSTEM_PARAMETERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload,result: null};
        default:
            return state;
    }
}
export const SystemParametersUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.SYSTEM_PARAMETERS_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.SYSTEM_PARAMETERS_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.SYSTEM_PARAMETERS_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.SYSTEM_PARAMETERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload,result: null};
        default:
            return state;
    }
}

export const SystemBackup = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.SYSTEM_BACKUP_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.SYSTEM_BACKUP_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.SYSTEM_BACKUP_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.SYSTEM_BACKUP_FAILED:
            return {...state, isLoading: false, errMess: action.payload,result: null};
        default:
            return state;
    }
}
