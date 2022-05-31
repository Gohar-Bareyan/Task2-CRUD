import {
    SET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_SUCCESS, SET_TO_DO_LIST_ERROR, GET_TO_DO_LIST_REQUEST,
    DELETE_TO_DO_LIST, UPDATE_TO_DO_LIST, SORT_BY_DATE, SORT_ALPHABETICALLY, SET_PROGRESS_REQUEST, GET_PROGRESS_REQUEST, REORDER_BY_DRAG_AND_DROP
} from './Type';

export const setToDoListRequest = (data: object) => {
    return {
        type: SET_TO_DO_LIST_REQUEST,
        payload: data
    }
}

export const setToDoListSuccess = (data: any) => {
    return {
        type: SET_TO_DO_LIST_SUCCESS,
        payload: data
    }
}

export const setToDoListError = (data: any) => {
    return {
        type: SET_TO_DO_LIST_ERROR,
        payload: data
    }
}

export const getToDoListRequest: any = (data: any) => {
    return {
        type: GET_TO_DO_LIST_REQUEST,
        payload: data
    }
}

export const deleteToDoList: any = (data: number, toDoList: any) => {
    return {
        type: DELETE_TO_DO_LIST,
        payload: data,
        toDoList
    }
}

export const updateToDoList: any = (data: object, listId: number) => {
    // console.log(data, listId);
    return {
        type: UPDATE_TO_DO_LIST,
        payload: data,
        listId
    }
}

export const sortByDate: any = () => {
    return {
        type: SORT_BY_DATE
    }
}

export const sortAlphabetically = () => {
    return {
        type: SORT_ALPHABETICALLY
    }
}

export const setProgressRequest: any = (data: any) => {
    return {
        type: SET_PROGRESS_REQUEST,
        payload: data
    }
}

export const getProgressRequest = () => {
    return {
        type: GET_PROGRESS_REQUEST
    }
}

export const reOrderByDragAndDrop = (data: any) => {
    // console.log(data);
    
    return {
        type: REORDER_BY_DRAG_AND_DROP,
        payload: data
    }
}

