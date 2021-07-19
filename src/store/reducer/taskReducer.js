import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    taskData: null,
    page: 1,
    count: 3,
    isLoadingPage: true,
    currentSortField: '',
    currentSortDirection: 'desc',
    errorMessage: null,
    isLoadingCreateTask: false,
    isCreatedTask: false,
    isLoadingEditTask: false,
    isEditedTask: false
}


const taskReducer = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        taskDataAC(state, action) {
            state.taskData = action.payload
        },
        changeStatusTaskAC(state, action) {
            state.taskData.tasks = state.taskData.tasks.map(t => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        status: action.payload.status
                    }
                }
                return t
            })
        },
        pageAC(state, action) {
            state.page = action.payload
        },
        isLoadingPageAC(state, action) {
            state.isLoadingPage = action.payload
        },
        currentSortFieldAC(state, action) {
            state.currentSortField = action.payload
        },
        currentSortDirectionAC(state, action) {
            state.currentSortDirection = action.payload
        },
        errorMessageAC(state, action) {
            state.errorMessage = action.payload
        },
        isLoadingCreateTaskAC(state, action) {
            state.isLoadingCreateTask = action.payload
        },
        isCreatedTaskAC(state, action) {
            state.isCreatedTask = action.payload
        },
        isLoadingEditTaskAC(state, action) {
            state.isLoadingEditTask = action.payload
        },
        isEditedTaskAC(state, action) {
            state.isEditedTask = action.payload
        }

    }
})

export const {
    taskDataAC,
    pageAC,
    isLoadingPageAC,
    currentSortFieldAC,
    currentSortDirectionAC,
    errorMessageAC,
    isLoadingCreateTaskAC,
    isCreatedTaskAC,
    changeStatusTaskAC,
    isLoadingEditTaskAC,
    isEditedTaskAC
} = taskReducer.actions
export default taskReducer.reducer