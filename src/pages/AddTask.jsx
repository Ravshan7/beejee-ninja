import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createTaskApi} from "../http/taskApi";
import {errorMessageAC, isCreatedTaskAC, taskDataAC} from "../store/reducer/taskReducer";
import {useHistory} from 'react-router-dom'
import From from "../components/From";

const AddTask = () => {
    const dispatch = useDispatch()
    const {errorMessage, isLoadingCreateTask, isCreatedTask} = useSelector(state => state.task)
    const [formData, setFormData] = useState([
        {
            id: 1,
            value: '',
            type: 'text',
            name: 'username',
            validate: '',
            placeholder: 'Имя'
        },
        {
            id: 2,
            value: '',
            type: 'text',
            name: 'email',
            validate: '',
            placeholder: 'Почта'
        },
        {
            id: 3,
            value: '',
            type: 'text',
            name: 'text',
            validate: '',
            placeholder: 'Текст задачи'
        }
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
            dispatch(taskDataAC(null))
        }
    }, [errorMessage])

    useEffect(() => {
        if (isCreatedTask) {
            history.push('/tasks')
        }
        return () => {
            dispatch(isCreatedTaskAC(false))
        }
    }, [isCreatedTask])


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
        dispatch(createTaskApi(payload))
    }


    return <From
        form={formData}
        title={"Создать задачу"}
        onChangeFiled={handlerChangeField}
        onSubmit={handlerSubmit}
        disabled={isLoadingCreateTask}
    />;
};

export default AddTask;
