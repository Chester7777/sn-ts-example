import {Dispatch} from "redux";
import {authAPI} from "../API/API";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {AllAppStateType} from "./Redux-store";

const SET_USER_DATA = "SET_USER_DATA";


export type InitialStateType = {
    userId: string
    email: string | null
    login: string | null
    isAuth: boolean
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
    isAuth: false
}

const authReducer = (state = initialState, action: SetAuthUserDataAction): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userId: action.payload.userId,
                email: action.payload.email,
                login: action.payload.login,
                isAuth: action.payload.isAuth
            }
        default:
            return state
    }
}

export type SetAuthUserDataAction = {
    type: typeof SET_USER_DATA
    payload: InitialStateType
}

export const setAuthUserData = (userId: string, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
} as const)

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.data.resultCode === 0) {
                let {id, email, login} = data.data.data
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
}
export const login = (email: string, password: number, rememberMe: boolean = false) => (dispatch: ThunkDispatch<AllAppStateType, unknown, SetAuthUserDataAction | FormAction>) => {
    authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                let message = response.data.messages.length > 10 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}));
            }
        })
}
export const logout = () => (dispatch: Dispatch) => {
    authAPI.loginAuth()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData('', null, null, false));
            }
        })
}

export default authReducer;