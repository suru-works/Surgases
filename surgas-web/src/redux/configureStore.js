import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Register, RegisterClient, CheckTel } from './register';
import { Login } from './login';
import { Logout } from './logout';
import { User, UserUpdate } from './user';
import { Account, AccountUpdate} from './account'
import { Maps } from './maps';
import { Users, UsersUpdate } from './users';
import { Products, ProductsUpdate, TrolleyProducts, LastProductPrice, Productoxcliente, ProductoxclienteInsert, ProductoxclienteUpdate } from './products';
import { Orders, OrdersUpdate, OrderUpdateOldOrder, OrderUpdateOldOrderProducts, PrintOrder } from './orders';
import { SystemParameters, SystemParametersUpdate, SystemBackup, GetServerIva } from './system';
import { Restore } from './restore';
import { Verify } from './verify';
import { ChangePassword } from './restore';
import { Clients, ClientsUpdate, OrderClient, LastOrder} from './clients';
import { Employees, EmployeesUpdate, NewOrderEmployees} from './employees';
import { Printers, PrintOrderPrinters, PrintersUpdate, Print} from './printers';
import { OrderStats } from './orderStats';

 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({            
            checkTel: CheckTel,
            register: Register,
            registerClient: RegisterClient,
            login: Login,
            logout: Logout,
            account: Account,
            accountUpdate: AccountUpdate,
            user: User,
            userUpdate: UserUpdate,
            users: Users,
            usersUpdate:UsersUpdate,
            products: Products,
            productsUpdate: ProductsUpdate,
            trolleyProducts: TrolleyProducts,
            lastProductPrice:LastProductPrice,
            productoxcliente:Productoxcliente,
            productoxclienteInsert: ProductoxclienteInsert,
            productoxclienteUpdate: ProductoxclienteUpdate,
            orders: Orders,
            ordersUpdate: OrdersUpdate,
            orderUpdateOldOrder: OrderUpdateOldOrder,
            orderUpdateOldOrderProducts: OrderUpdateOldOrderProducts,
            printOrder: PrintOrder,
            printOrderPrinters: PrintOrderPrinters,
            systemParameters: SystemParameters,
            systemParametersUpdate:SystemParametersUpdate,
            systemBackup: SystemBackup,
            getServerIva: GetServerIva,
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