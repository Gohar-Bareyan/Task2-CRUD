import { ResponseGenerator } from './Interfaces/index';
import { GET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_REQUEST, DELETE_TO_DO_LIST, SORT_BY_DATE, SORT_ALPHABETICALLY, GET_LIST_INFO_REQUEST } from './ToDoList/Type';
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
	yield takeEvery(GET_LIST_INFO_REQUEST, getListInfo)
}

function* setToDoListRequest({ payload }: any) {
	try {
		const result: ResponseGenerator = yield Axios.post("http://localhost:5000/add-toDoList", { data: payload.data })
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
		console.log(result.data);
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

function* getListInfo({ payload }: any) {
	console.log(payload);

	try {
		const result: ResponseGenerator = yield Axios.get("http://localhost:5000/get-list-info", { data: payload })

	} catch (e) {
		console.error(e);

	}
}


export default rootSaga