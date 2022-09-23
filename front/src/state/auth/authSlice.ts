import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../models/IUser";
import {initialState} from "./initialState";

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setAuth: (state, {payload}: PayloadAction<boolean>) => {
            state.isAuth = payload;
        },
        setUser: (state, {payload}: PayloadAction<IUser>) => {
            state.user = payload;
        },
    },
})

export const {setUser, setAuth, setLoading} = authSlice.actions;
export default authSlice.reducer;
