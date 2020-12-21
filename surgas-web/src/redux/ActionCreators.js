import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseBackUrl } from '../shared/baseUrl';


// Register

export const registerReset = () => ({
    type: ActionTypes.REGISTER_RESET
});

export const registerRequest = () => ({
    type: ActionTypes.REGISTER_REQUEST
});

export const registerSuccess = (result) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: result
});

export const registerFailed = (errmess) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: errmess
});

export const register = (user) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/signup', user);
        dispatch(registerSuccess(res));
    } catch (err) {
        dispatch(registerFailed(err));
    }
}


// Login

export const loginReset = () => ({
    type: ActionTypes.LOGIN_RESET
});

export const loginRequest = () => ({
    type: ActionTypes.LOGIN_REQUEST
});

export const loginSuccess = (result) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: result
});

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const login = (user) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/login', user);
        dispatch(loginSuccess(res));
    } catch (err) {
        dispatch(loginFailed(err));
    }
}

// User

export const userReset = () => ({
    type: ActionTypes.USER_RESET
});

export const userRequest = () => ({
    type: ActionTypes.USER_REQUEST
});

export const userSuccess = (result) => ({
    type: ActionTypes.USER_SUCCESS,
    payload: result
});

export const userFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess
});

export const user = () => async (dispatch) => {
    dispatch(userRequest());

    try {
        const res = await axios.get(baseBackUrl + 'users/current');
        dispatch(userSuccess(res));
    } catch (err) {
        dispatch(userFailed(err));
    }
}

//Restore and change password 
export const restoreRequest = () => ({
    type: ActionTypes.RESTORE_REQUEST
});

export const restoreReset = () => ({
    type: ActionTypes.RESTORE_RESET
});

export const restoreSuccess = (result) => ({
    type: ActionTypes.RESTORE_SUCCESS,
    payload: result
});

export const restoreFailed = (errmess) => ({
    type: ActionTypes.RESTORE_FAILED,
    payload: errmess
});

export const restorePassword = (user) => (dispatch) => {
    // IMPLEMENTAR
}

export const changePasswordRequest = () => ({
    type: ActionTypes.CHANGEPASSWORD_REQUEST
});

export const changePasswordReset = () => ({
    type: ActionTypes.CHANGEPASSWORD_RESET
});

export const changePasswordSuccess = (result) => ({
    type: ActionTypes.CHANGEPASSWORD_SUCCESS,
    payload: result
});

export const changePasswordFailed = (errmess) => ({
    type: ActionTypes.CHANGEPASSWORD_FAILED,
    payload: errmess
});

export const changePassword = (data) => (dispatch) => {
    // IMPLEMENTAR
}