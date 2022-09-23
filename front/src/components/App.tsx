import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {checkAuth} from "../state/auth/asyncActions";
import {Router} from "./Router";
import Loading from "./pages/Loading";

const App = () => {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <Router/>
    );
}

export default App;
