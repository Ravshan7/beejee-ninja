import {$host, $userName} from "./index";
import {alert} from "../utils/alert";
import {
    errorMessageAC,
    isCreatedTaskAC, isEditedTaskAC,
    isLoadingCreateTaskAC, isLoadingEditTaskAC,
    isLoadingPageAC,
    taskDataAC
} from "../store/reducer/taskReducer";
import {fieldErrorMessage} from "../utils/errorMessage";

export const getTaskApi = (page, currentSortField, currentSortDirection) => async dispatch => {
    dispatch(isLoadingPageAC(true))
    try {
        const {data} = await $host.get(`?${$userName}&page=${page}${currentSortField && `&sort_field=${currentSortField}`}&sort_direction=${currentSortDirection}`)
        if (data.status === 'ok') {
            dispatch(taskDataAC(data.message))
            dispatch(isLoadingPageAC(false))
        } else {
            alert(fieldErrorMessage.serverError)
        }
    } catch (e) {
        alert(e.message)
    }
}

export const createTaskApi = (formData) => async (dispatch) => {
    dispatch(isLoadingCreateTaskAC(true))
    try {
        const bodyFormData = new FormData();
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                bodyFormData.append(key, formData[key])
            }
        }
        const {data} = await $host.post(`/create?${$userName}`, bodyFormData)
        if (data.status === 'ok') {
            alert('Задание успешно добален!')
            dispatch(isCreatedTaskAC(true))
        } else {
            dispatch(errorMessageAC(JSON.stringify(data.message)))
        }
        dispatch(isLoadingCreateTaskAC(false))
    } catch (e) {
        alert(e.message)
    }
}

export const editTaskApi = (taskId, status, text) => async (dispatch, getState) => {
    const {page, currentSortField, currentSortDirection} = getState().task

    dispatch(isLoadingEditTaskAC(true))
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('status', status)
        bodyFormData.append('text', text)
        bodyFormData.append('token', localStorage.getItem('jwtToken'))
        const {data} = await $host.post(`/edit/${taskId}?${$userName}`, bodyFormData)
        if (data.status === 'ok') {
            alert('Задание успешно изменен!')
            dispatch(isEditedTaskAC(true))
            dispatch(getTaskApi(page, currentSortField, currentSortDirection))
        } else {
            alert('Невалидный токен');
        }
        dispatch(isLoadingEditTaskAC(false))
    } catch (e) {
        alert(e.message)
    }
}