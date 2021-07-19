import React, {useEffect, useState} from 'react';
import Card from "../../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {alert} from "../../utils/alert";
import {useHistory} from "react-router-dom";
import {isEditedTaskAC} from "../../store/reducer/taskReducer";
import {editTaskApi} from "../../http/taskApi";

const ShowTask = ({currentTask}) => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.auth)
    const {isLoadingEditTask, isEditedTask} = useSelector(state => state.task)
    const [task, setTask] = useState(currentTask)
    const [isEdit, setIsEdit] = useState(currentTask)
    const [isEditText, setIsEditText] = useState(false)
    const [toggle, setToggle] = useState(false)


    const history = useHistory()


    useEffect(() => {
        if (isEditedTask) {
            history.push('/tasks')
        }
        return () => {
            dispatch(isEditedTaskAC(false))
        }
    }, [isEditedTask])

    useEffect(() => {
        setTask(currentTask)
        if (currentTask.status === 10 || currentTask.status === 11) {
            setToggle(true)
        }
    }, [currentTask])


    useEffect(() => {
        if (currentTask.text !== task.text) {
            setIsEditText(true)
        } else {
            setIsEditText(false)
        }
    }, [task.text])

    const handlerChangeFieldText = (e) => {
        setTask(prev => {
            return {
                ...prev,
                text: e.target.value,
            }
        })
    }


    const handlerChangeToggle = () => {
        if (isAuth) {
            setToggle(prev => !prev)
        } else {
            alert('Вы не авторизованы!')
        }
    }

    const handlerSubmit = () => {
        let statusCode;


        switch (currentTask.status) {
            case 0:
            case 10:
                if (toggle) {
                    statusCode = 10
                }
                if (isEditText) {
                    statusCode = 1
                }
                if (toggle && isEditText) {
                    statusCode = 11
                }
                if (!toggle && !isEditText) {
                    statusCode = 0
                }
                break
            case 1:
            case 11:
                if (toggle) {
                    statusCode = 11
                } else {
                    statusCode = 1
                }
                break
            default:
                break

        }

        dispatch(editTaskApi(task.id, statusCode, task.text))
    }


    return (
        <Card
            isAuth={isAuth}
            task={task}
            isEdit={isEdit}
            setIsEdit={() => setIsEdit(prev => !prev)}
            changeFieldText={handlerChangeFieldText}
            clickPrev={() => history.push('/tasks')}
            clickSubmit={handlerSubmit}
            disabled={isLoadingEditTask}
            currentStatusCode={currentTask.status}
            setIsEditStatus
            toggle={toggle}
            setToggle={handlerChangeToggle}
        />
    );
};

export default ShowTask;
