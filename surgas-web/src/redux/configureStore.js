import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Register } from './register';
import { Login } from './login';
import { Logout } from './logout';
import { User, UserUpdate } from './user';
import { Maps } from './maps';
import { Users, UsersUpdate } from './users';
import { Products, ProductsUpdate } from './products';
import { SystemParameters, SystemParametersUpdate, SystemBackup } from './system';
import { Restore } from './restore';
import { ChangePassword } from './restore';

 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            register: Register,
            login: Login,
            logout: Logout,
            user: User,
            userUpdate: UserUpdate,
            users: Users,
            usersUpdate:UsersUpdate,
            products: Products,
            productsUpdate: ProductsUpdate,
            systemParameters: SystemParameters,
            systemParametersUpdate:SystemParametersUpdate,
            systemBackup: SystemBackup,
            restore: Restore,
            changePassword: ChangePassword,
            maps: Maps,
        }),
       compose(applyMiddleware(thunk),
       typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
            
        )
    );

     /*typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f */

    return store;
} 