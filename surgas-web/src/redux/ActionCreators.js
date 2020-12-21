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
        const res = await axios.post(baseBackUrl + 'signup', user);
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
        const res = await axios.post(baseBackUrl + 'login', user);
        dispatch(loginSuccess(res));
    } catch (err) {
        dispatch(loginFailed(err));
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
    dispatch(restoreRequest());

    return fetch(baseBackUrl + 'users/forgot', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                dispatch(restoreSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(restoreFailed(error)));
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
    dispatch(changePasswordRequest());

    return fetch(baseBackUrl + 'users/forgot/'+data.token, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                dispatch(changePasswordSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(changePasswordFailed(error)));
}