import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetUserAction,
} from "./types";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user,
    }),
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth,
    }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload,
    }),
    setError: (payload: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
        payload,
    }),

    login:
        (username: string, password: string) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true));

                setTimeout(async () => {
                    const { data } = await UserService.getUsers();
                    const mockUser = data.find(
                        (user) =>
                            user.username === username &&
                            user.password === password
                    );
                    if (mockUser) {
                        localStorage.setItem(`auth`, `true`);
                        localStorage.setItem(`username`, mockUser.username);
                        dispatch(AuthActionCreators.setUser(mockUser));
                        dispatch(AuthActionCreators.setIsAuth(true));
                    } else {
                        dispatch(
                            AuthActionCreators.setError(
                                "Wrong password or username"
                            )
                        );
                    }
                }, 5000);

                dispatch(AuthActionCreators.setIsLoading(false));
            } catch (e) {
                dispatch(
                    AuthActionCreators.setError("Произошла ошибка при логине")
                );
            }
        },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        dispatch(AuthActionCreators.setUser(null as unknown as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    },
};
