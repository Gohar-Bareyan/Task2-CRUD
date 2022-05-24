import { SET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_SUCCESS, SET_TO_DO_LIST_ERROR, GET_TO_DO_LIST_REQUEST } from './Type';

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

export const getToDoListRequest: any = (data:any) => {
    return {
        type: GET_TO_DO_LIST_REQUEST,
        payload: data
    }
}
