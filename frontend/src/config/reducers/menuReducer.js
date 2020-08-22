import {CHANGE_MENU_VISIBILITY} from '../actions/actionTypes.js'

const initialState= {
    isMenuVisible: true,
    user:{
        name: 'Usuário mock',
        email: 'Usuario @gmail.com'
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case CHANGE_MENU_VISIBILITY:
            return{
                ...state,
                isMenuVisible: action.payload
            }
        default: 
            return state
    }
}