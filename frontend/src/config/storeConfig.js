import {createStore, combineReducers} from 'redux'

import menuReducer from './reducers/menuReducer.js'

const reducers = combineReducers({
    menu: menuReducer
})

function storeConfig(){
    return createStore(reducers)
}


export default storeConfig;