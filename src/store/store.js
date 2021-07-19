import {reducers} from "./reducer";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: reducers,
    devTools: true
})

window.store = store

export default store