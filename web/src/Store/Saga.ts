import { ResponseGenerator } from './Interfaces/index';
import { GET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_REQUEST, DELETE_TO_DO_LIST, SORT_BY_DATE, SORT_ALPHABETICALLY, SET_PROGRESS_REQUEST, GET_PROGRESS_REQUEST, UPDATE_TO_DO_LIST, REORDER_BY_DRAG_AND_DROP } from './ToDoList/Type';
import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import { setToDoListSuccess } from './ToDoList/Action';

const Axios = axios.create({
	withCredentials: true
})

function* rootSaga() {
	yield call(watcherSaga)
}

function* watcherSaga() {
	yield takeEvery(SET_TO_DO_LIST_REQUEST, setToDoListRequest)
	yield takeEvery(GET_TO_DO_LIST_REQUEST, getToDoList)
	yield takeEvery(DELETE_TO_DO_LIST, deleteList)
	yield takeEvery(SORT_BY_DATE, getSortedByDateList)
	yield takeEvery(SORT_ALPHABETICALLY, getSortedAlphabeticallyList)
	yield takeEvery(SET_PROGRESS_REQUEST, setProgressRequest)
	yield takeEvery(GET_PROGRESS_REQUEST, getProgressRequest)
	yield takeEvery(UPDATE_TO_DO_LIST, updateToDoList)
	yield takeEvery(REORDER_BY_DRAG_AND_DROP, reOrderByDnD)
}

function* setToDoListRequest({ payload }: any) {
	try {
		const result: ResponseGenerator = yield Axios.post("http://localhost:5000/add-toDoList", { data: payload.data, toDoList: payload.toDoList })
		const toDoListCopy = [...payload.toDoList, result.data]
		yield put(setToDoListSuccess(toDoListCopy))
	} catch (e) {
		console.error(e);
	}
}

function* getToDoList() {
	try {
		const result: ResponseGenerator = yield Axios.get("http://localhost:5000/get-toDoList")
		yield put(setToDoListSuccess(result.data))
	} catch (e) {
		console.error(e);
	}
}

function* deleteList({ payload, toDoList }: any) {
	try {
		yield Axios.delete(`http://localhost:5000/delete-toDoList/${payload}`)
		const filteredToDoList = toDoList.filter((list: any) => list.id !== payload)
		yield put(setToDoListSuccess(filteredToDoList))
	} catch (e) {
		console.error(e);
	}
}

function* getSortedByDateList() {
	try {
		const result: ResponseGenerator = yield Axios.get("http://localhost:5000/get-sorted-by-date-list")
		yield put(setToDoListSuccess(result.data))
	} catch (e) {
		console.error(e);
	}
}

function* getSortedAlphabeticallyList() {
	try {
		const result: ResponseGenerator = yield Axios.get("http://localhost:5000/get-sorted-alphabetically-list")
		yield put(setToDoListSuccess(result.data))
	} catch (e) {
		console.error(e);
	}
}

function* setProgressRequest({ payload }: any) {
	try {
		const result: ResponseGenerator = yield Axios.post("http://localhost:5000/add-progress", { data: payload })
		yield put(setToDoListSuccess([...payload.toDoList, result.data]))
	} catch (e) {
		console.error(e);
	}
}

function* getProgressRequest() {
	try {
		const result: ResponseGenerator = yield Axios.get("http://localhost:5000/get-progress")
		yield put(setToDoListSuccess(result.data))
	} catch (e) {
		console.error(e);
	}
}

function* updateToDoList({ payload }: any) {
	try {
		const result: ResponseGenerator = yield Axios.put("http://localhost:5000/update-to-do", { data: payload })
		yield put(setToDoListSuccess(result.data))
	} catch (e) {
		console.error(e);
	}
}

function* reOrderByDnD({ payload }: any) {
	// console.log(payload);
	try {
		const result: ResponseGenerator = yield Axios.put("http://localhost:5000/re-order-to-do", { data: payload })
	} catch (e) {
		console.error(e);
	}
}


export default rootSaga