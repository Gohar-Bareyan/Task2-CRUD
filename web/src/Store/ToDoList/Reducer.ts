import {
    SET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_SUCCESS, SET_TO_DO_LIST_ERROR, GET_TO_DO_LIST_REQUEST, DELETE_TO_DO_LIST,
    UPDATE_TO_DO_LIST, SORT_BY_DATE, SORT_ALPHABETICALLY, SET_PROGRESS_REQUEST, GET_PROGRESS_REQUEST, REORDER_BY_DRAG_AND_DROP
} from './Type';
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
        case DELETE_TO_DO_LIST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_TO_DO_LIST:
            return {
                ...state,
                loading: true
            }
        case SORT_BY_DATE:
            return {
                ...state,
                loading: true
            }
        case SORT_ALPHABETICALLY:
            return {
                ...state,
                loading: true
            }
        case SET_PROGRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PROGRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REORDER_BY_DRAG_AND_DROP:
            return {
                ...state,
                loading: true
            }
    }
    return { ...state }
}