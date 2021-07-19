import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";
export const reducers = combineReducers({
    auth: authReducer,
    task: taskReducer
})