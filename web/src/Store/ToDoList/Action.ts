import {
    SET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_SUCCESS, SET_TO_DO_LIST_ERROR, GET_TO_DO_LIST_REQUEST,
    DELETE_TO_DO_LIST, UPDATE_TO_DO_LIST, SORT_BY_DATE, SORT_ALPHABETICALLY, SET_LIST_INFO_SUCCESS,
    GET_LIST_INFO_REQUEST
} from './Type';

export const setToDoListRequest = (data: object) => {
    // console.log(data);
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

export const updateToDoList: any = (data: any) => {
    return {
        type: UPDATE_TO_DO_LIST,
        payload: data
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

export const setListInfoSuccess = (data: any) => {
    return {
        type: SET_LIST_INFO_SUCCESS,
        payload: data
    }
}

export const getListInfoRequest = (data: number) => {
    // console.log(data);
    
    return {
        type: GET_LIST_INFO_REQUEST,
        payload: data
    }
}


