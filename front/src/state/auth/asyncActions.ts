import {AppThunk} from "../rootStore";
import {setAuth, setUser, setLoading} from "./authSlice";
import AuthService from "../../services/AuthService";
import {IUser} from "../../models/IUser";
import axios from "axios";
import {AuthResponse} from "../../models/AuthResponse";
import {API_URL} from "../../http";

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        console.log(e.response?.data?.message)
    }
}

export const registration = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const response = await AuthService.registration(email, password);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        console.log(e.response?.data?.message)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(setUser({} as IUser));
    } catch (e: any) {
        console.log(e.response?.data?.message)
    }
}

export const checkAuth = (): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        console.log(e.response?.data?.message)
    } finally {
        dispatch(setLoading(false));
    }
}
