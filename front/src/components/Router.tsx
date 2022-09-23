import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./forms/Register";
import {Login} from "./forms/Login";
import {useAppSelector} from "../hooks/redux";
import Main from "./pages/Main";

export const Router: FC = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);

    return (
        <Routes>
            <Route path='/' element={isAuth ? <Main/> : <Login/>}/>
            <Route path='*' element={isAuth ? <Main/> : <Login/>}/>
            {!isAuth && <Route path='/register' element={<Register/>}/>}
        </Routes>
    );
}
