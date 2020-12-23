import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseBackUrl } from '../shared/baseUrl';

axios.defaults.withCredentials = true;

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
        const res = await axios.post(baseBackUrl + 'users/login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(loginSuccess(res));
    } catch (err) {
        dispatch(loginFailed(err));
    }
}

//logout

export const logoutReset = () => ({
    type: ActionTypes.LOGOUT_RESET
});

export const logoutRequest = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = (result) => ({
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: result
});

export const logoutFailed = (errmess) => ({
    type: ActionTypes.LOGOUT_FAILED,
    payload: errmess
});

export const logout = (user) => async (dispatch) => {
    dispatch(logoutRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/logout', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(logoutSuccess(res));
    } catch (err) {
        dispatch(logoutFailed(err));
    }
}

// User (AUTENTIFICACION)

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

//Users

export const usersReset = () => ({
    type: ActionTypes.USERS_RESET
});

export const usersRequest = () => ({
    type: ActionTypes.USERS_REQUEST
});

export const usersSuccess = (result) => ({
    type: ActionTypes.USERS_SUCCESS,
    payload: result
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const users = () => async (dispatch) => {
    dispatch(usersRequest());

    try {
        const res = await axios.get(baseBackUrl + 'users');
        dispatch(usersSuccess(res));
    } catch (err) {
        dispatch(usersFailed(err));
    }
}

export const usersUpdateReset = () => ({
    type: ActionTypes.USERS_UPDATE_RESET
});

export const usersUpdateRequest = () => ({
    type: ActionTypes.USERS_UPDATE_REQUEST
});

export const usersUpdateSuccess = (result) => ({
    type: ActionTypes.USERS_UPDATE_SUCCESS,
    payload: result
});

export const usersUpdateFailed = (errmess) => ({
    type: ActionTypes.USERS_UPDATE_FAILED,
    payload: errmess
});


export const updateUser = (userData) => async (dispatch) => {
    dispatch(usersUpdateRequest());
    const id = userData.nick;
    const user = {
        nombre: userData.nombre,
        administrador: userData.administrador,
        comun: userData.comun
    }
    try {
        const res = await axios.put(baseBackUrl + 'users/'+ id, user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(usersUpdateSuccess(res));
    } catch (err) {
        dispatch(usersUpdateFailed(err));
    }
}

export const deleteUser = (userData) => async (dispatch) => {
    dispatch(usersUpdateRequest());
    const id = userData.nick;
    try {
        const res = await axios.delete(baseBackUrl + 'users/'+ id, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(usersUpdateSuccess(res));
    } catch (err) {
        dispatch(usersUpdateFailed(err));
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