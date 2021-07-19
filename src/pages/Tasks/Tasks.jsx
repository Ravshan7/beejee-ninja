import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TaskList from "./TaskList/TaskList";
import {LoadingLine} from "../../components/ui/Preloader/LoadingLine";
import {useParams} from 'react-router-dom'
import ShowTask from "./ShowTask";
import {getTaskApi} from "../../http/taskApi";

const Tasks = () => {
    const dispatch = useDispatch()
    const {
        taskData,
        count,
        page,
        isLoadingPage,
        currentSortField,
        currentSortDirection
    } = useSelector(state => state.task)
    const [taskId, setTaskId] = useState('');

    const params = useParams()

    useEffect(() => {
        setTaskId(params.taskId)
    }, [params])


    useEffect(() => {
        dispatch(getTaskApi(page, currentSortField, currentSortDirection))
    }, [page, currentSortField, currentSortDirection])


    if (!taskData) return <LoadingLine/>

    if (taskData.tasks.length === 0) return <p
        style={{textAlign: 'center', borderTop: '1px solid #dadada', paddingTop: '20px'}}>Cписок задач пока что
        пуст.</p>

    const currentTask = taskData.tasks.find(el => el.id === +taskId)

    if (+taskId === currentTask?.id) return <ShowTask currentTask={currentTask}/>

    return (
        <div>
            <TaskList
                taskData={taskData}
                count={count}
                page={page}
                isLoadingPage={isLoadingPage}
                currentSortField={currentSortField}
                currentSortDirection={currentSortDirection}
            />
        </div>
    );
};

export default Tasks;
