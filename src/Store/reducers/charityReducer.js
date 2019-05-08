import { ADD_CHARITY, FETCH_CHARITIES } from '../actions/types';

const initialState = {
    items: []
}

export default function( state = initialState, action) {
    switch(action.type) {
        case ADD_CHARITY:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case FETCH_CHARITIES:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}