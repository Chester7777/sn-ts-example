import {Dispatch} from "redux";
import {authAPI} from "../API/API";

const SET_USER_DATA = "SET_USER_DATA";


export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type PostPropsType = {
    data: {
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
    isAuth: true
}


const authReducer = (state = initialState, action: SetAuthUserDataAction): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        default:
            return state
    }
}

export type SetAuthUserDataAction = {
    type: typeof SET_USER_DATA
    data: InitialStateType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, data: {userId, email, login, isAuth}
} as const)
export const getAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (dispatch: Dispatch) => {

    authAPI.me().then((data) => {
        if (data.data.resultCode === 0) {
            let {id, email, login} = data.data.data
            dispatch(setAuthUserData(id, email, login, false));
        }
    })
}

export default authReducer;