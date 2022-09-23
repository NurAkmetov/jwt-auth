import {IUser} from "../../models/IUser";

export default interface AuthState {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
}

export const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false
}
