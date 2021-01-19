import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Register } from './register';
import { Login } from './login';
import { Logout } from './logout';
import { User, UserUpdate } from './user';
import { Maps } from './maps';
import { Users, UsersUpdate } from './users';
import { Products, ProductsUpdate, TrolleyProducts } from './products';
import { Orders, OrdersUpdate } from './orders';
import { SystemParameters, SystemParametersUpdate, SystemBackup } from './system';
import { Restore } from './restore';
import { Verify } from './verify';
import { ChangePassword } from './restore';
import { Clients, ClientsUpdate, OrderClient, LastOrder} from './clients';
import { Employees, EmployeesUpdate, NewOrderEmployees} from './employees';
import { Printers, PrintersUpdate, Print} from './printers';
import { OrderStats } from './orderStats';

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
            trolleyProducts: TrolleyProducts,
            orders: Orders,
            ordersUpdate: OrdersUpdate,
            systemParameters: SystemParameters,
            systemParametersUpdate:SystemParametersUpdate,
            systemBackup: SystemBackup,
            restore: Restore,
            changePassword: ChangePassword,
            verify: Verify,
            maps: Maps,
            clients: Clients,
            clientsUpdate: ClientsUpdate,
            lastOrder: LastOrder,
            orderClient: OrderClient,
            orderStats: OrderStats,
            employees: Employees,
            employeesUpdate: EmployeesUpdate,
            printers: Printers,
            printersUpdate: PrintersUpdate,
            print: Print,
            newOrderEmployees: NewOrderEmployees
        }),
       compose(applyMiddleware(thunk),
       typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
            
        )
    );

     /*typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f */

    return store;
} 