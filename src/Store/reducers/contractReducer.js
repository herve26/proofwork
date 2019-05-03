import { GET_CONTRACT } from "../actions/types";

const initialState = {
    instance: null
}

export default function( state = initialState, action) {
    switch(action.type) {
        case GET_CONTRACT:
            return {
                ...state,
                instance: action.payload
            }
        default:
            return state
    }
}