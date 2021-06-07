import {Dispatch} from "redux";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType} from "./Redux-store";
import {securityAPI} from "../API/SecurityAPI";
import {AuthAPI} from "../API/AuthAPI";

const SET_USER_DATA = "sn/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "sn/auth/GET_CAPTCHA_URL_SUCCESS";
type ActionsType = SetAuthUserDataAction | GetCaptchaUrlACType

export type InitialStateType = {
    userId: string
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl?: string | null
}
export type PostPropsType = {
    id: null,
    email: null,
    login: null,
    resultCode?: number
    messages?: Array<string>
}

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState: InitialStateType = {
    userId: '',
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export type SetAuthUserDataAction = {
    type: typeof SET_USER_DATA
    payload: InitialStateType
}
export type GetCaptchaUrlACType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string | null }
}
type ThunkType = BaseThunkType<ActionsType | SetAuthUserDataAction | FormAction>;

export const setAuthUserData = (userId: string, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
} as const);
export const getCaptchaUrlAC = (captchaUrl: string | null): GetCaptchaUrlACType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
} as const)


export const getAuthUserData = (): ThunkType => async (dispatch: Dispatch) => {
    let response = await AuthAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: number, rememberMe: boolean = false, captcha?: string | null): ThunkType =>
    async (dispatch) => {
        let response = await AuthAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 10 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
export const logout = (): ThunkType => async (dispatch) => {
    let response = await AuthAPI.loginAuth();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData('', null, null, false));
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.security();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlAC(captchaUrl));

}

export default authReducer;