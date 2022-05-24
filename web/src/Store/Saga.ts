import { ResponseGenerator } from './Interfaces/index';
import { GET_TO_DO_LIST_REQUEST, SET_TO_DO_LIST_REQUEST } from './ToDoList/Type';
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
}

function* setToDoListRequest({ payload }: any) {
	// console.log(payload);

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


export default rootSaga