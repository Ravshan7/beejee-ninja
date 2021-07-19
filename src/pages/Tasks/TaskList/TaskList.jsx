import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {LoadingCircle} from "../../../components/ui/Preloader/LoadingCircle";
import {useHistory} from 'react-router-dom'
import {
    currentSortDirectionAC,
    currentSortFieldAC,
    pageAC,
} from "../../../store/reducer/taskReducer";
import Lists from "./Lists";
import Pagination from "./Pagination";


const TaskList = ({taskData, count, page, isLoadingPage}) => {
    const dispatch = useDispatch()
    const [thead, setThead] = useState([
        {
            id: 1,
            name: 'Name',
            value: 'name',
            sortCount: 0,
            sortField: '',
            sortDirection: 'desc'
        },
        {
            id: 2,
            name: 'Email',
            value: 'email',
            sortCount: 0,
            sortField: '',
            sortDirection: 'desc'
        },
        {
            id: 3,
            name: 'Text',
            value: '',
            sortCount: 0,
            sortField: '',
            sortDirection: 'desc'
        },
        {
            id: 4,
            name: 'Status',
            value: 'status',
            sortCount: 0,
            sortField: '',
            sortDirection: 'desc'
        }
    ])
    const [theadId, setTheadId] = useState(null)

    const history = useHistory()

    useEffect(() => {
        const currentThead = thead.find(th => th.id === theadId)
        if (currentThead) {
            dispatch(currentSortFieldAC(currentThead.sortField))
            dispatch(currentSortDirectionAC(currentThead.sortDirection))
        }
    }, [JSON.stringify(thead)])

    const paginationQuantity = new Array(Math.ceil(taskData.total_task_count / count)).fill('').map((el, i) => i + 1)

    const handlerSortClick = (id, value) => {
        setTheadId(id)
        setThead(prev => prev.map(th => {
            if (th.id === id) {
                if (th.sortCount < 2) {
                    if (th.sortDirection === 'desc') {
                        return {
                            ...th,
                            sortCount: th.sortCount + 1,
                            sortField: value,
                            sortDirection: 'asc'
                        }
                    }
                    return {
                        ...th,
                        sortCount: th.sortCount + 1,
                        sortField: value,
                        sortDirection: 'desc'
                    }
                } else {
                    return {
                        ...th,
                        sortCount: 0,
                        sortField: '',
                        sortDirection: 'desc'
                    }
                }
            }
            return {
                ...th,
                sortCount: 0,
                sortField: '',
                sortDirection: 'asc'
            }
        }))
    }

    const handlerListClick = (id) => {
        history.push(`/tasks/${id}`)
    }

    const handlerPaginationClick = (value) => {
        if (value === 'prev') {
            page--
            dispatch(pageAC(page))
        } else if (value === 'next') {
            page++
            dispatch(pageAC(page))
        } else {
            dispatch(pageAC(value))
        }
    }



    return (
        <>
            <h3>Список задач</h3>
            {!isLoadingPage ? <Lists
                    tasks={taskData.tasks}
                    thead={thead}
                    sortClick={handlerSortClick}
                    listClick={handlerListClick}
                /> :
                <div style={{textAlign: "center", padding: "80px 0"}}><LoadingCircle size={"71px"}/></div>}

            <Pagination
                quantity={paginationQuantity}
                currentPage={page}
                paginationClick={handlerPaginationClick}
                isLoadingPage={isLoadingPage}
            />
        </>
    );
};

export default TaskList;
