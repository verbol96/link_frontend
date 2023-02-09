import {legacy_createStore as createStore, combineReducers} from 'redux'
import { orderReducer } from './orderReducer'


const rootReducer = combineReducers({
    order: orderReducer
})

export const store = createStore(rootReducer)