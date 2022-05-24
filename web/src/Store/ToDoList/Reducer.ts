import { SET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_SUCCESS, SET_TO_DO_LIST_ERROR, GET_TO_DO_LIST_REQUEST } from './Type';
import { toDoListState } from './State';
export const toDoListReducer = (state = toDoListState, action: any) => {
    switch (action.type) {
        case SET_TO_DO_LIST_REQUEST:
            return {
                ...state,
                loadig: true
            }
        case SET_TO_DO_LIST_SUCCESS:
            return {
                ...state,
                toDoList: action.payload,
                loading: false
            }
        case SET_TO_DO_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case GET_TO_DO_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
    }
    return { ...state }
}