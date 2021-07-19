import React, {useEffect} from 'react';
import 'materialize-css'
import Navbar from "./components/Navbar";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
import Auth from "./pages/Auth";
import Tasks from "./pages/Tasks/Tasks";
import AddTask from "./pages/AddTask";
import {useDispatch, useSelector} from "react-redux";
import {isAuthAC} from "./store/reducer/authReducer";


const App = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.auth)
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem('jwtToken')
        if (token) {
            dispatch(isAuthAC(true))
        }
    }, [isAuth])


    if (location.pathname === '/') return <Redirect to="/tasks"/>

    return (
        <div>
            <Navbar isAuth={isAuth}/>
            <div className="container" style={{marginTop: '20px'}}>
                <Switch>
                    <Route exact path="/tasks/:taskId?" render={() => <Tasks/>}/>
                    <Route exact path="/add" render={() => <AddTask/>}/>
                    {!isAuth && <Route exact path="/auth" render={() => <Auth/>}/>}
                    <Redirect to="/"/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
