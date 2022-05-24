import { createStore, applyMiddleware } from "redux";
import  { rootReducer } from "./Root";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./Saga";

const sagaMiddleWare = createSagaMiddleware()

export const myStore = createStore(rootReducer, applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(rootSaga)