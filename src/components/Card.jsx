import React from 'react';
import {statusTask} from "../utils/statusTask";
import {LoadingCircle} from "./ui/Preloader/LoadingCircle";

const Card = ({
                  isAuth,
                  task,
                  isEdit,
                  setIsEdit,
                  changeFieldText,
                  clickPrev,
                  clickSubmit,
                  disabled,
                  currentStatusCode,
                  toggle,
                  setToggle
              }) => {
    return (
        <div className="card">
            <header>
                <h4>О задаче</h4>
                <span>
                    <label>
                        <input
                            type="checkbox"
                            checked={toggle}
                            onChange={setToggle}
                        />
                        <span/>
                    </label>
                    {isAuth &&
                    <>
                        <a onClick={setIsEdit} className="waves-effect waves-light btn"><i
                            className="material-icons">edit</i></a>
                        {disabled
                            ? <a style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
                                 className="waves-effect waves-light btn"><LoadingCircle size={'20px'} color={'#fff'}/></a>
                            : <a onClick={clickSubmit} className="waves-effect waves-light btn"><i
                                className="material-icons">save</i></a>}
                    </>}
                </span>
            </header>
            <main>
                {!isEdit
                    ? <textarea value={task.text} onChange={changeFieldText}/>
                    : <div style={{cursor: 'default'}}>
                        {task.text}
                    </div>
                }

            </main>
            <footer>
                <p><b>Кто создал:</b> {task.username}</p>
                <p><b>Почта:</b> {task.email}</p>
                <p><b>Статус:</b> {statusTask.find(s => s.code === currentStatusCode).status}</p>
            </footer>

            <a onClick={clickPrev} className="waves-effect waves-light btn"><i
                className="material-icons left">chevron_left</i>Назад</a>

        </div>
    );
};

export default Card;
