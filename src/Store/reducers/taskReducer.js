import { FETCH_TASKS, NEW_TASK, UPDATE_TASKS_TIME, START_TASKS_UPDATE, STOP_TASKS_UPDATE, UPDATE_TASKS_STATUS } from "../actions/types";

const initialState = {
    items: [],
    isUpdatingTasks: false,
    status: {pending: 0, completed: 0, failed: 0}
}

export default function( state = initialState, action) {
    switch(action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                items: action.payload
            }
        case UPDATE_TASKS_TIME:
            return {
                ...state,
                items: action.payload
            }
        case START_TASKS_UPDATE:
            return {
                ...state,
                isUpdatingTasks: true
            }
        case STOP_TASKS_UPDATE:
            return {
                ...state,
                isUpdatingTasks: false
            }
        case NEW_TASK:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case UPDATE_TASKS_STATUS:
          return {
            ...state,
            status: action.payload
          }
        default:
            return state
    }
}
