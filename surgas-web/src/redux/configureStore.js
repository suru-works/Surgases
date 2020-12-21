import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Register } from './register';
import { Login } from './login';
import { User } from './user';
import { Restore } from './restore';

 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            register: Register,
            login: Login,
            user: User,
            restore: Restore,
        }),
       compose(applyMiddleware(thunk)

            
        )
    );

     /*typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f */

    return store;
} 