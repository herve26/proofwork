import { WEB3CONNECT } from "../actions/types";

const initialState = {
    instance: null
}

export default function( state = initialState, action) {
    switch(action.type) {
        case WEB3CONNECT:
            return {
                ...state,
                instance: action.payload
            }
        default:
            return state
    }
}