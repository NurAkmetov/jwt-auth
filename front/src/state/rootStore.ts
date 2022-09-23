import {configureStore, Action, combineReducers} from '@reduxjs/toolkit'
import authReducer from '../state/auth/authSlice';
import {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
    authReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
