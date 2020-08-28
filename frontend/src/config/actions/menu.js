import { CHANGE_MENU_VISIBILITY/* , SET_USER_DROPDOWN  */} from './actionTypes.js'

export function changeMenuVisibility(visibility) {
    return {
        type: CHANGE_MENU_VISIBILITY,
        payload: visibility
    }
}
