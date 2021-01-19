import * as ActionTypes from './ActionTypes';

export const Employees = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.EMPLOYEES_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.EMPLOYEES_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.EMPLOYEES_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.EMPLOYEES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const EmployeesUpdate = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.EMPLOYEES_UPDATE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.EMPLOYEES_UPDATE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.EMPLOYEES_UPDATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.EMPLOYEES_UPDATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}

export const NewOrderEmployees = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.NEWORDER_EMPLOYEES_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.NEWORDER_EMPLOYEES_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.NEWORDER_EMPLOYEES_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.NEWORDER_EMPLOYEES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}
