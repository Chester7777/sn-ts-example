import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AllAppStateType} from "./Redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";


export type InitialStateType = {
    initialized: boolean
}
export type AppActionType = InitializedSuccessType

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

export type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = () => (dispatch: ThunkDispatch<AllAppStateType, unknown, AppActionType>) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })

}


export default appReducer;