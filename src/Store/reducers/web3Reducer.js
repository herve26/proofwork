import { WEB3CONNECT } from "../actions/types";

const initialState = {
    web3: null
}

export default function( state = initialState, action) {
    switch(action.type) {
        case WEB3CONNECT:
            return {
                ...state,
                web3: action.payload
            }
        default:
            return state
    }
}