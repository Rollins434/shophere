import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsReducer, productListReducer} from './Reducers/productReducer'
import {cartReducer} from '../src/Reducers/cartReducer'
import { userDetailsReducer, userLoginReducer, userUpdateProfileReducer } from './Reducers/userReducer'
import { userRegisterReducer } from './Reducers/userReducer'
import { orderCreateReducer } from './Reducers/orderReducers'

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : []

const initialState = ({
    cart : {cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin : {userInfo:userInfoFromStorage}
})

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;