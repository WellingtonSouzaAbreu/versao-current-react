import {CHANGE_MENU_VISIBILITY} from '../actions/actionTypes.js'

const initialState= {
    menuVisible: false,
    user: null
}

export default function(state = initialState, action){
    switch(action.type){
        case CHANGE_MENU_VISIBILITY:
            return{
                ...state,
                menuVisible: action.payload
            }
        default: 
            return state
    }
}