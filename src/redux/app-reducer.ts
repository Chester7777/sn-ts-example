import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AllAppStateType} from "./Redux-store";

const INITIALIZED_SUCCESS = "SN/APP/INITIALIZED_SUCCESS";


export type InitialStateType = typeof initialState;
export type AppActionType = InitializedSuccessType;

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
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


export const initializedSuccess = (): InitializedSuccessType => ({type: "SN/APP/INITIALIZED_SUCCESS"} as const)

export const initializeApp = () => (dispatch: ThunkDispatch<AllAppStateType, unknown, AppActionType>) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer;