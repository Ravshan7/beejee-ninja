import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import From from "../components/From";
import {authApi} from "../http/authApi";
import {errorMessageAC} from "../store/reducer/authReducer";

const Auth = () => {
    const dispatch = useDispatch()
    const {errorMessage, isLoading, isAuth} = useSelector(state => state.auth)
    const [formData, setFormData] = useState([
        {
            id: 1,
            value: '',
            type: 'text',
            name: 'username',
            validate: '',
            placeholder: 'Логин'
        },
        {
            id: 2,
            value: '',
            type: 'password',
            name: 'password',
            validate: '',
            placeholder: 'Пароль'
        },
    ])
    const history = useHistory()


    useEffect(() => {
        if (errorMessage) {
            const parseerrorMessage = JSON.parse(errorMessage)
            const arrayerrorMessage = []
            for (let message in parseerrorMessage) {
                if (parseerrorMessage.hasOwnProperty(message)) {
                    arrayerrorMessage.push({
                        name: message,
                        message: parseerrorMessage[message]
                    })
                }
            }
            setFormData(prev => prev.map(field => {
                const currenterrorMessage = arrayerrorMessage.find(m => m.name === field.name)
                if (field.name === currenterrorMessage?.name) {
                    return {
                        ...field,
                        validate: currenterrorMessage?.message
                    }
                }
                return {
                    ...field,
                    validate: ''
                }
            }))
        }
        return () => {
            dispatch(errorMessageAC(''))
        }
    }, [errorMessage])

    useEffect(() => {
        if (isAuth) {
            history.push('/tasks')
        }
    }, [isAuth])


    const handlerChangeField = (e) => {
        const {name, value} = e.target
        setFormData(prev => prev.map(field => {
            if (field.name === name) {
                return {
                    ...field,
                    value: value
                }
            }
            return field
        }))
    }

    const handlerSubmit = () => {
        const payload = {}
        formData.forEach(field => {
            payload[field.name] = field.value
        })
        dispatch(authApi(payload))
    }


    return <From
        form={formData}
        title={"Авторизация"}
        onChangeFiled={handlerChangeField}
        onSubmit={handlerSubmit}
        disabled={isLoading}
        buttonName={'Войти'}
    />;
};

export default Auth;
