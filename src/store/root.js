import {legacy_createStore as createStore, combineReducers} from 'redux'
import { orderReducer } from './orderReducer'
import { authReducer } from './authReducer'


const rootReducer = combineReducers({
    order: orderReducer,
    auth: authReducer
})

export const store = createStore(rootReducer)