import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {isAuthAC} from "../store/reducer/authReducer";

const Navbar = ({isAuth}) => {
    const dispatch = useDispatch()
    const history = useHistory()


    const handlerLogout = () => {
        dispatch(isAuthAC(false))
        localStorage.removeItem('jwtToken')
        history.push('/tasks')
    }

    return (
        <nav>
            <div className="nav-wrapper container">
                <a href="#" className="brand-logo">BeeJee</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/tasks" activeClassName="activeLink">Список задач</NavLink></li>
                    <li><NavLink exact to="/add" activeClassName="activeLink">Создать задачу</NavLink></li>
                    {!isAuth
                        ? <li><NavLink exact to="/auth" activeClassName="activeLink">Авторизация</NavLink></li>
                        : <li onClick={handlerLogout}><a>Выход из профиля</a></li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
