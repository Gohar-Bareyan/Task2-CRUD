import { combineReducers } from "redux"
import { toDoListReducer } from "./ToDoList/Reducer"

export const rootReducer = combineReducers({
    toDoList: toDoListReducer
})

export type RootState = ReturnType<typeof rootReducer>


