import { CLOSE_SIDEBAR } from "./action/clsoeSidebar";
import { OPEN_SIDEBAR } from "./action/openSidebar";
import { SET_NOTIFICATION } from "./action/setNotification";

const initialState = {
    sideBarIsOpen: false,
    notification: null
}
const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return { ...state, sideBarIsOpen: true }
        case CLOSE_SIDEBAR:
            return { ...state, sideBarIsOpen: false }
        case SET_NOTIFICATION:
            return { ...state, notification: action.payload }
        default:
            return { ...state }
    }
}

export default AppReducer;