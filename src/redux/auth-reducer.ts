
const SET_USER_DATA = "SET_USER_DATA";


export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type PostPropsType = {
    data: InitialStateType
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

export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA, data: {userId, email, login, isAuth}
} as const)

export default authReducer;