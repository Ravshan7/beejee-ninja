import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    errorMessage: '',
    isLoading: false
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        initializedAC(state, action) {

        },
        isAuthAC(state, action) {
            state.isAuth = action.payload
        },
        errorMessageAC(state, action) {
            state.errorMessage = action.payload
        },
        isLoadingAC(state, action) {
            state.isLoading = action.payload
        }
    }
})


export const {errorMessageAC, isLoadingAC, isAuthAC} = authReducer.actions
export default authReducer.reducer