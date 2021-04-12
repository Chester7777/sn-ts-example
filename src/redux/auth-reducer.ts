import {Dispatch} from "redux";
import {authAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";


export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type PostPropsType = {
    payload: {
        id: null,
        email: null,
        login: null,
    }
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
    userId: null,
    email: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action: SetAuthUserDataAction): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
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

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
} as const)

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.data.resultCode === 0) {
                let {id, email, login} = data.data.payload
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
}
export const login = (email: string, password: number, rememberMe: boolean = false) => (dispatch: Dispatch) => {
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
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
}

export default authReducer;