import {alert} from "../utils/alert";
import {$host, $userName} from "./index";
import {errorMessageAC, isAuthAC, isLoadingAC} from "../store/reducer/authReducer";


export const authApi = (formData) => async dispatch => {
    dispatch(isLoadingAC(true))
    try {
        const bodyFormData = new FormData();
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                bodyFormData.append(key, formData[key])
            }
        }
        const {data} = await $host.post(`/login?${$userName}`, bodyFormData)
        if (data.status === 'ok') {
            dispatch(isAuthAC(true))
            localStorage.setItem('jwtToken', data.message.token)
            alert('Авторизация прошла успешно!')
        } else {
            dispatch(errorMessageAC(JSON.stringify(data.message)))
        }
        dispatch(isLoadingAC(false))
    } catch (e) {
        alert(e.message)
    }
}
