import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../API/API";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {AllAppStateType} from "./Redux-store";

const SET_USER_DATA = "samurai_network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai_network/auth/GET_CAPTCHA_URL_SUCCESS";
type ActionType = SetAuthUserDataAction | GetCaptchaUrlACType

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
// export type InitialStateType = {
//     data: DataPropsType
//     resultCode?: number
//     messages?: Array<string>
// }
//

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState: InitialStateType = {
    userId: '',
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
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
    payload: {captchaUrl: string | null}
}

export const setAuthUserData = (userId: string, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
} as const);
export const getCaptchaUrlAC = (captchaUrl: string | null): GetCaptchaUrlACType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: number, rememberMe: boolean = false, captcha?: string | null) => async (dispatch: ThunkDispatch<AllAppStateType, unknown, SetAuthUserDataAction | FormAction>) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
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
export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.loginAuth();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData('', null, null, false));
    }
}
export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    let response = await securityAPI.security();
    const captchaUrl = response.data.url
        dispatch(getCaptchaUrlAC(captchaUrl));

}

export default authReducer;