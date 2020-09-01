import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            
        }),
       compose(applyMiddleware(thunk)

            
        )
    );

     /*typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f */

    return store;
} 