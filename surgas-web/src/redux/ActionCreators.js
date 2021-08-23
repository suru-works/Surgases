import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseBackUrl } from '../shared/baseUrl';
import ProductsAdministration from '../components/ProductsAdministrationComponent';

axios.defaults.withCredentials = true;

// Register

export const checkTelReset = () => ({
    type: ActionTypes.CHECKTEL_RESET
});

export const checkTelRequest = () => ({
    type: ActionTypes.CHECKTEL_REQUEST
});

export const checkTelSuccess = (result) => ({
    type: ActionTypes.CHECKTEL_SUCCESS,
    payload: result
});

export const checkTelFailed = (errmess) => ({
    type: ActionTypes.CHECKTEL_FAILED,
    payload: errmess
});

export const checkTel = (tel) => async (dispatch) => {
    dispatch(checkTelRequest());

    try {
        const resCheckClient = await axios.get(baseBackUrl + 'users/check-client/'+tel);
        const resGetClient = await axios.get(baseBackUrl + 'clientes/check-client/'+tel);
        let res ={
            foundInUsers: resCheckClient.data.found,
            foundInClients: resGetClient.data.found
        }
        dispatch(checkTelSuccess(res));
    } catch (err) {
        dispatch(checkTelFailed(err));
    }
}

export const registerClientReset = () => ({
    type: ActionTypes.REGISTERCLIENT_RESET
});

export const registerClientRequest = () => ({
    type: ActionTypes.REGISTERCLIENT_REQUEST
});

export const registerClientSuccess = (result) => ({
    type: ActionTypes.REGISTERCLIENT_SUCCESS,
    payload: result
});

export const registerClientFailed = (errmess) => ({
    type: ActionTypes.REGISTERCLIENT_FAILED,
    payload: errmess
});

export const registerClient = (user) => async (dispatch) => {
    dispatch(registerClientRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/signup', user);
        dispatch(registerClientSuccess(res));
    } catch (err) {
        dispatch(registerClientFailed(err));
    }
}

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

export const register = (userClient) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/signup/client', userClient);
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
        console.log(err);
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


export const userUpdateReset = () => ({
    type: ActionTypes.USER_UPDATE_RESET
});

export const userUpdateRequest = () => ({
    type: ActionTypes.USER_UPDATE_REQUEST
});

export const userUpdateSuccess = (result) => ({
    type: ActionTypes.USER_UPDATE_SUCCESS,
    payload: result
});

export const userUpdateFailed = (errmess) => ({
    type: ActionTypes.USER_UPDATE_FAILED,
    payload: errmess
});


export const updateCurrentUser = (userData) => async (dispatch) => {
    dispatch(userUpdateRequest());
    const user = {
        nombre: userData.nombre,
        tipo: userData.tipo
    }
    try {
        const res = await axios.put(baseBackUrl + 'users/current', user, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(userUpdateSuccess(res));
    } catch (err) {
        dispatch(userUpdateFailed(err));
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

export const users = (args) => async (dispatch) => {
    dispatch(usersRequest());
    let urlparams = 'users';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
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
    const id = userData.username;
    try {
        const res = await axios.put(baseBackUrl + 'users/'+ id, userData, {
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
    const id = userData.username;
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

export const addUser = (userData) => async (dispatch) => {
    dispatch(usersUpdateRequest());
    const user = userData;
    try {
        const res = await axios.post(baseBackUrl + 'users/signup', user,{
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


//Productos, MUCHA ATENCIÓN ES PRODUCTOS EN ESPAÑOL, NO PRODUCTS

export const productsReset = () => ({
    type: ActionTypes.PRODUCTS_RESET
});

export const productsRequest = () => ({
    type: ActionTypes.PRODUCTS_REQUEST
});

export const productsSuccess = (result) => ({
    type: ActionTypes.PRODUCTS_SUCCESS,
    payload: result
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const products = (args) => async (dispatch) => {
    dispatch(productsRequest());
    let urlparams = 'productos';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(productsSuccess(res));
    } catch (err) {
        dispatch(productsFailed(err));
    }
}

export const productsUpdateReset = () => ({
    type: ActionTypes.PRODUCTS_UPDATE_RESET
});

export const productsUpdateRequest = () => ({
    type: ActionTypes.PRODUCTS_UPDATE_REQUEST
});

export const productsUpdateSuccess = (result) => ({
    type: ActionTypes.PRODUCTS_UPDATE_SUCCESS,
    payload: result
});

export const productsUpdateFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_UPDATE_FAILED,
    payload: errmess
});


export const updateProduct = (productData) => async (dispatch) => {
    dispatch(productsUpdateRequest());
    const id = productData.codigo;
    const product = {
        nombre: productData.nombre,
        disponible: productData.disponible,
        tipo: productData.tipo,
        color: productData.color,
        peso: productData.peso,
        precio: productData.precio,
        inventario: productData.inventario
    }
    try {
        const res = await axios.put(baseBackUrl + 'productos/'+ id, product, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(productsUpdateSuccess(res));
    } catch (err) {
        dispatch(productsUpdateFailed(err));
    }
}

export const deleteProduct = (productData) => async (dispatch) => {
    dispatch(productsUpdateRequest());
    const id = productData.codigo;
    try {
        const res = await axios.delete(baseBackUrl + 'productos/'+ id, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(productsUpdateSuccess(res));
    } catch (err) {
        dispatch(productsUpdateFailed(err));
    }
}

export const addProduct = (productData) => async (dispatch) => {
    dispatch(productsUpdateRequest());
    const product = productData;
    try {
        const res = await axios.post(baseBackUrl + 'productos', product,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(productsUpdateSuccess(res));
    } catch (err) {
        dispatch(productsUpdateFailed(err));
    }
}

//Orders

export const ordersReset = () => ({
    type: ActionTypes.ORDERS_RESET
});

export const ordersRequest = () => ({
    type: ActionTypes.ORDERS_REQUEST
});

export const ordersSuccess = (result) => ({
    type: ActionTypes.ORDERS_SUCCESS,
    payload: result
});

export const ordersFailed = (errmess) => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errmess
});

export const orders = (args) => async (dispatch) => {
    dispatch(ordersRequest());
    let urlparams = 'pedidos';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(ordersSuccess(res));
    } catch (err) {
        dispatch(ordersFailed(err));
    }
}

export const ordersUpdateReset = () => ({
    type: ActionTypes.ORDERS_UPDATE_RESET
});

export const ordersUpdateRequest = () => ({
    type: ActionTypes.ORDERS_UPDATE_REQUEST
});

export const ordersUpdateSuccess = (result) => ({
    type: ActionTypes.ORDERS_UPDATE_SUCCESS,
    payload: result
});

export const ordersUpdateFailed = (errmess) => ({
    type: ActionTypes.ORDERS_UPDATE_FAILED,
    payload: errmess
});


export const updateOrder = (orderData) => async (dispatch) => {
    dispatch(ordersUpdateRequest());
    const id = orderData.codigo;
    const order = {
        nombre: orderData.nombre,
        disponible: orderData.disponible,
        tipo: orderData.tipo,
        color: orderData.color,
        peso: orderData.peso,
        precio: orderData.precio,
        inventario: orderData.inventario
    }
    try {
        const res = await axios.put(baseBackUrl + 'pedidos/'+ id, order, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(ordersUpdateSuccess(res));
    } catch (err) {
        dispatch(ordersUpdateFailed(err));
    }
}

export const deleteOrder = (order) => async (dispatch) => {
    dispatch(ordersUpdateRequest());
    const id = order.codigo;
    try {
        const res = await axios.delete(baseBackUrl + 'pedidos/'+ id, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(ordersUpdateSuccess(res));
    } catch (err) {
        dispatch(ordersUpdateFailed(err));
    }
}

export const addOrder= (orderData) => async (dispatch) => {
    dispatch(ordersUpdateRequest());
    const order = orderData;
    try {
        const res = await axios.post(baseBackUrl + 'pedidos', order,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(ordersUpdateSuccess(res));
    } catch (err) {
        dispatch(ordersUpdateFailed(err));
    }
}


//trolleyProducts

export const trolleyProductsReset = () => ({
    type: ActionTypes.TROLLEY_PRODUCTS_RESET
});

export const trolleyProductsRequest = () => ({
    type: ActionTypes.TROLLEY_PRODUCTS_REQUEST
});

export const trolleyProductsSuccess = (result) => ({
    type: ActionTypes.TROLLEY_PRODUCTS_SUCCESS,
    payload: result
});

export const trolleyProductsFailed = (errmess) => ({
    type: ActionTypes.TROLLEY_PRODUCTS_FAILED,
    payload: errmess
});

export const trolleyProducts = (args) => async (dispatch) => {
    dispatch(trolleyProductsRequest());
    let urlparams = 'productos';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(trolleyProductsSuccess(res));
    } catch (err) {
        dispatch(trolleyProductsFailed(err));
    }
}


//Restore password
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

export const restorePassword = (username) => async (dispatch) => {
    dispatch(restoreRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/restorepassword/',{username: username}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(restoreSuccess(res));
    } catch (err) {
        dispatch(restoreFailed(err));
    }
}

//Account

export const getAccountDataRequest = () => ({
    type: ActionTypes.GET_ACCOUNT_DATA_REQUEST
});

export const getAccountDataReset = () => ({
    type: ActionTypes.GET_ACCOUNT_DATA_RESET
});

export const getAccountDataSuccess = (result) => ({
    type: ActionTypes.GET_ACCOUNT_DATA_SUCCESS,
    payload: result
});

export const getAccountDataFailed = (errmess) => ({
    type: ActionTypes.GET_ACCOUNT_DATA_FAILED,
    payload: errmess
});

export const getAccountData = () => async (dispatch) => {
    dispatch(getAccountDataRequest());

    try {
        const res = await axios.get(baseBackUrl + 'users/account');
        dispatch(getAccountDataSuccess(res));
    } catch (err) {
        dispatch(getAccountDataFailed(err));
    }
}


//verify account

export const verifyRequest = () => ({
    type: ActionTypes.VERIFY_REQUEST
});

export const verifyReset = () => ({
    type: ActionTypes.VERIFY_RESET
});

export const verifySuccess = (result) => ({
    type: ActionTypes.VERIFY_SUCCESS,
    payload: result
});

export const verifyFailed = (errmess) => ({
    type: ActionTypes.VERIFY_FAILED,
    payload: errmess
});

export const verify = (data) => async (dispatch) => {
    dispatch(verifyRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/verify',data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(verifySuccess(res));
    } catch (err) {
        dispatch(verifyFailed(err));
    }
}

//changePassword password
export const changePasswordRequest = () => ({
    type: ActionTypes.CHANGE_PASSWORD_REQUEST
});

export const changePasswordReset = () => ({
    type: ActionTypes.CHANGE_PASSWORD_RESET
});

export const changePasswordSuccess = (result) => ({
    type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: result
});

export const changePasswordFailed = (errmess) => ({
    type: ActionTypes.CHANGE_PASSWORD_FAILED,
    payload: errmess
});

export const changePassword = (data) => async (dispatch) => {
    dispatch(changePasswordRequest());

    try {
        const res = await axios.post(baseBackUrl + 'users/changePassword/',data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(changePasswordSuccess(res));
    } catch (err) {
        dispatch(changePasswordFailed(err));
    }
}


//maps

export const mapsReset = () => ({
    type: ActionTypes.MAPS_RESET
});

export const mapsRequest = () => ({
    type: ActionTypes.MAPS_REQUEST
});

export const mapsSuccess = (result) => ({
    type: ActionTypes.MAPS_SUCCESS,
    payload: result
});

export const mapsFailed = (errmess) => ({
    type: ActionTypes.MAPS_FAILED,
    payload: errmess
});

export const maps = () => async (dispatch) => {
    dispatch(mapsRequest());

    try {
        const res = await axios.get(baseBackUrl + 'maps');
        dispatch(mapsSuccess(res));
    } catch (err) {
        dispatch(mapsFailed(err));
    }
}


// System

export const systemParametersReset = () => ({
    type: ActionTypes.SYSTEM_PARAMETERS_RESET
});

export const systemParametersRequest = () => ({
    type: ActionTypes.SYSTEM_PARAMETERS_REQUEST
});

export const systemParametersSuccess = (result) => ({
    type: ActionTypes.SYSTEM_PARAMETERS_SUCCESS,
    payload: result
});

export const systemParametersFailed = (errmess) => ({
    type: ActionTypes.SYSTEM_PARAMETERS_FAILED,
    payload: errmess
});

export const systemParameters = () => async (dispatch) => {
    dispatch(systemParametersRequest());

    try {
        const res = await axios.get(baseBackUrl + 'system/parameters/1');
        dispatch(systemParametersSuccess(res));
    } catch (err) {
        dispatch(systemParametersFailed(err));
    }
}

// Employees

export const employeesReset = () => ({
    type: ActionTypes.EMPLOYEES_RESET
});

export const employeesRequest = () => ({
    type: ActionTypes.EMPLOYEES_REQUEST
});

export const employeesSuccess = (result) => ({
    type: ActionTypes.EMPLOYEES_SUCCESS,
    payload: result
});

export const employeesFailed = (errmess) => ({
    type: ActionTypes.EMPLOYEES_FAILED,
    payload: errmess
});

export const employees = (args) => async (dispatch) => {
    dispatch(employeesRequest());
    let urlparams = 'empleados';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(employeesSuccess(res));
    } catch (err) {
        dispatch(employeesFailed(err));
    }
}

export const employeesUpdateReset = () => ({
    type: ActionTypes.EMPLOYEES_UPDATE_RESET
});

export const employeesUpdateRequest = () => ({
    type: ActionTypes.EMPLOYEES_UPDATE_REQUEST
});

export const employeesUpdateSuccess = (result) => ({
    type: ActionTypes.EMPLOYEES_UPDATE_SUCCESS,
    payload: result
});

export const employeesUpdateFailed = (errmess) => ({
    type: ActionTypes.EMPLOYEES_UPDATE_FAILED,
    payload: errmess
});


export const updateEmployee = (employeeData) => async (dispatch) => {
    dispatch(employeesUpdateRequest());
    const id = employeeData.id;
    const employee = {
        nombre: employeeData.nombre,
        direccion: employeeData.direccion,
        telefono: employeeData.telefono,
        estado: employeeData.estado,
        tipo: employeeData.tipo
    }
    try {
        const res = await axios.put(baseBackUrl + 'empleados/'+ id, employee, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(employeesUpdateSuccess(res));
    } catch (err) {
        dispatch(employeesUpdateFailed(err));
    }
}

export const deleteEmployee = (employeeData) => async (dispatch) => {
    dispatch(employeesUpdateRequest());
    const id = employeeData.id;
    try {
        const res = await axios.delete(baseBackUrl + 'empleados/'+ id, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(employeesUpdateSuccess(res));
    } catch (err) {
        dispatch(employeesUpdateFailed(err));
    }
}

export const addEmployee = (employeeData) => async (dispatch) => {
    dispatch(employeesUpdateRequest());
    const employee = employeeData;
    try {
        const res = await axios.post(baseBackUrl + 'empleados', employee,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(employeesUpdateSuccess(res));
    } catch (err) {
        dispatch(employeesUpdateFailed(err));
    }
}

// New order employees

export const newOrderEmployeesReset = () => ({
    type: ActionTypes.NEWORDER_EMPLOYEES_RESET
});

export const newOrderEmployeesRequest = () => ({
    type: ActionTypes.NEWORDER_EMPLOYEES_REQUEST
});

export const newOrderEmployeesSuccess = (result) => ({
    type: ActionTypes.NEWORDER_EMPLOYEES_SUCCESS,
    payload: result
});

export const newOrderEmployeesFailed = (errmess) => ({
    type: ActionTypes.NEWORDER_EMPLOYEES_FAILED,
    payload: errmess
});

export const newOrderEmployees = (args) => async (dispatch) => {
    dispatch(newOrderEmployeesRequest());
    let urlparams = 'empleados';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(newOrderEmployeesSuccess(res));
    } catch (err) {
        dispatch(newOrderEmployeesFailed(err));
    }
}

export const systemParametersUpdateReset = () => ({
    type: ActionTypes.SYSTEM_PARAMETERS_UPDATE_RESET
});

export const systemParametersUpdateRequest = () => ({
    type: ActionTypes.SYSTEM_PARAMETERS_UPDATE_REQUEST
});

export const systemParametersUpdateSuccess = (result) => ({
    type: ActionTypes.SYSTEM_PARAMETERS_UPDATE_SUCCESS,
    payload: result
});

export const systemParametersUpdateFailed = (errmess) => ({
    type: ActionTypes.SYSTEM_PARAMETERS_UPDATE_FAILED,
    payload: errmess    
});

export const systemParametersUpdate = (parameters) => async (dispatch) => {
    dispatch(systemParametersUpdateRequest());
    try {
        const res = await axios.put(baseBackUrl + 'system/parameters/1', parameters, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(systemParametersUpdateSuccess(res));
    } catch (err) {
        dispatch(systemParametersUpdateFailed(err));
    }
}

export const systemBackupReset = () => ({
    type: ActionTypes.SYSTEM_BACKUP_RESET
});

export const systemBackupRequest = () => ({
    type: ActionTypes.SYSTEM_BACKUP_REQUEST
});

export const systemBackupSuccess = (result) => ({
    type: ActionTypes.SYSTEM_BACKUP_SUCCESS,
    payload: result
});

export const systemBackupFailed = (errmess) => ({
    type: ActionTypes.SYSTEM_BACKUP_FAILED,
    payload: errmess
});

export const systemBackup = () => async (dispatch) => {
    dispatch(systemBackupRequest());

    try {
        const res = await axios.post(baseBackUrl + 'system/backup', {}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(systemBackupSuccess(res));
    } catch (err) {
        dispatch(systemBackupFailed(err));
    }
}
//printers
export const printReset = () => ({
    type: ActionTypes.PRINT_RESET
});

export const printRequest = () => ({
    type: ActionTypes.PRINT_REQUEST
});

export const printSuccess = (result) => ({
    type: ActionTypes.PRINT_SUCCESS,
    payload: result
});

export const printFailed = (errmess) => ({
    type: ActionTypes.PRINT_FAILED,
    payload: errmess
});

export const print = () => async (dispatch) => {
    dispatch(printRequest());
    const orderData = {

    }

    try {
        const res = await axios.post(baseBackUrl + 'pedidos/print', orderData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(printSuccess(res));
    } catch (err) {
        dispatch(printFailed(err));
    }
}


// clients

export const clientsReset = () => ({
    type: ActionTypes.CLIENTS_RESET
});

export const clientsRequest = () => ({
    type: ActionTypes.CLIENTS_REQUEST
});

export const clientsSuccess = (result) => ({
    type: ActionTypes.CLIENTS_SUCCESS,
    payload: result
});

export const clientsFailed = (errmess) => ({
    type: ActionTypes.CLIENTS_FAILED,
    payload: errmess
});

export const clients = (args) => async (dispatch) => {
    dispatch(clientsRequest());
    let urlparams = 'clientes';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(clientsSuccess(res));
    } catch (err) {
        dispatch(clientsFailed(err));
    }
}

export const clientsUpdateReset = () => ({
    type: ActionTypes.CLIENTS_UPDATE_RESET
});

export const clientsUpdateRequest = () => ({
    type: ActionTypes.CLIENTS_UPDATE_REQUEST
});

export const clientsUpdateSuccess = (result) => ({
    type: ActionTypes.CLIENTS_UPDATE_SUCCESS,
    payload: result
});

export const clientsUpdateFailed = (errmess) => ({
    type: ActionTypes.CLIENTS_UPDATE_FAILED,
    payload: errmess
});


export const updateClient = (clientData) => async (dispatch) => {
    dispatch(clientsUpdateRequest());
    const id = clientData.telefono;
    const client = {
        email: clientData.email,
        nombre: clientData.nombre,
        puntos: clientData.puntos,
        descuento: clientData.descuento,
        tipo: clientData.tipo
    }
    try {
        const res = await axios.put(baseBackUrl + 'clientes/'+ id, client, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(clientsUpdateSuccess(res));
    } catch (err) {
        dispatch(clientsUpdateFailed(err));
    }
}

export const deleteClient = (clientData) => async (dispatch) => {
    dispatch(clientsUpdateRequest());
    const id = clientData.telefono;
    try {
        const res = await axios.delete(baseBackUrl + 'clientes/'+ id, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(clientsUpdateSuccess(res));
    } catch (err) {
        dispatch(clientsUpdateFailed(err));
    }
}

export const addClient = (clientData) => async (dispatch) => {
    dispatch(clientsUpdateRequest());
    const cliente = clientData;
    try {
        const res = await axios.post(baseBackUrl + 'clientes', cliente,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(clientsUpdateSuccess(res));
    } catch (err) {
        dispatch(clientsUpdateFailed(err));
    }
}


export const orderClientReset = () => ({
    type: ActionTypes.ORDER_CLIENT_RESET
});

export const orderClientRequest = () => ({
    type: ActionTypes.ORDER_CLIENT_REQUEST
});

export const orderClientSuccess = (result) => ({
    type: ActionTypes.ORDER_CLIENT_SUCCESS,
    payload: result
});

export const orderClientFailed = (errmess) => ({
    type: ActionTypes.ORDER_CLIENT_FAILED,
    payload: errmess
});

export const orderClient = (args) => async (dispatch) => {
    dispatch(orderClientRequest());
    let urlparams = 'clientes';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(orderClientSuccess(res));
    } catch (err) {
        dispatch(orderClientFailed(err));
    }
}

//lastOrder

export const lastOrderReset = () => ({
    type: ActionTypes.LAST_ORDER_RESET
});

export const lastOrderRequest = () => ({
    type: ActionTypes.LAST_ORDER_REQUEST
});

export const lastOrderSuccess = (result) => ({
    type: ActionTypes.LAST_ORDER_SUCCESS,
    payload: result
});

export const lastOrderFailed = (errmess) => ({
    type: ActionTypes.LAST_ORDER_FAILED,
    payload: errmess
});

export const lastOrder = (telefono) => async (dispatch) => {
    dispatch(lastOrderRequest());
    try {
        const res = await axios.get(baseBackUrl + 'clientes/'+telefono+'/last_order');
        dispatch(lastOrderSuccess(res));
    } catch (err) {
        dispatch(lastOrderFailed(err));
    }
}

// Statistics

export const orderStatsReset = () => ({
    type: ActionTypes.ORDER_STATS_RESET
});

export const orderStatsRequest = () => ({
    type: ActionTypes.ORDER_STATS_REQUEST
});

export const orderStatsSuccess = (result) => ({
    type: ActionTypes.ORDER_STATS_SUCCESS,
    payload: result
});

export const orderStatsFailed = (errmess) => ({
    type: ActionTypes.ORDER_STATS_FAILED,
    payload: errmess
});

export const orderStats = () => async (dispatch) => {
    dispatch(orderStatsRequest());

    try {
        const res = await axios.get(baseBackUrl + 'pedidos/stats');
        dispatch(orderStatsSuccess(res));
    } catch (err) {
        dispatch(orderStatsFailed(err));
    }
}

// Printers

export const printersReset = () => ({
    type: ActionTypes.PRINTERS_RESET
});

export const printersRequest = () => ({
    type: ActionTypes.PRINTERS_REQUEST
});

export const printersSuccess = (result) => ({
    type: ActionTypes.PRINTERS_SUCCESS,
    payload: result
});

export const printersFailed = (errmess) => ({
    type: ActionTypes.PRINTERS_FAILED,
    payload: errmess
});

export const printers = (args) => async (dispatch) => {
    dispatch(printersRequest());
    let urlparams = 'impresoras';
    if(args){
        urlparams += '?'+args.join('&');
    }

    try {
        const res = await axios.get(baseBackUrl + urlparams);
        dispatch(printersSuccess(res));
    } catch (err) {
        dispatch(printersFailed(err));
    }
}

export const printersUpdateReset = () => ({
    type: ActionTypes.PRINTERS_UPDATE_RESET
});

export const printersUpdateRequest = () => ({
    type: ActionTypes.PRINTERS_UPDATE_REQUEST
});

export const printersUpdateSuccess = (result) => ({
    type: ActionTypes.PRINTERS_UPDATE_SUCCESS,
    payload: result
});

export const printersUpdateFailed = (errmess) => ({
    type: ActionTypes.PRINTERS_UPDATE_FAILED,
    payload: errmess
});


export const updatePrinter= (printerData) => async (dispatch) => {
    dispatch(printersUpdateRequest());
    const codigo = printerData.codigo;
    const printer = {
        descripcion: printerData.descripcion
    }
    try {
        const res = await axios.put(baseBackUrl + 'impresoras/'+ codigo, printer, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(printersUpdateSuccess(res));
    } catch (err) {
        dispatch(printersUpdateFailed(err));
    }
}

export const deletePrinter = (printerData) => async (dispatch) => {
    dispatch(printersUpdateRequest());
    const codigo = printerData.codigo;
    try {
        const res = await axios.delete(baseBackUrl + 'impresoras/'+ codigo, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(printersUpdateSuccess(res));
    } catch (err) {
        dispatch(printersUpdateFailed(err));
    }
}

export const addPrinter = (printerData) => async (dispatch) => {
    dispatch(printersUpdateRequest());
    const printer = printerData;
    try {
        const res = await axios.post(baseBackUrl + 'impresoras', printer,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch(printersUpdateSuccess(res));
    } catch (err) {
        dispatch(printersUpdateFailed(err));
    }
}