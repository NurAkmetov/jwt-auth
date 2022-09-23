import React from 'react';
import {logout} from "../../state/auth/asyncActions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const Main = () => {
    const dispatch = useAppDispatch();
    const {user, isAuth} = useAppSelector(state => state.authReducer);

    return (
        <div>
            <h1>{isAuth ? 'user is authorized' : 'user is unauthorized'}</h1>
            <h1>{user?.isActivated ? 'Account is activated' : 'Account is deactivated'}</h1>
            <button onClick={() => dispatch(logout())}>Выйти</button>
        </div>
    );
};

export default Main;