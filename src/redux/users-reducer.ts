import {Dispatch} from "redux";
import {usersAPI} from "../API/UsersAPI";
import {BaseThunkType} from "./Redux-store";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER = "SET_USER";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
}

export type UsersType = {
    "name": string
    "id": number
    "uniqueUrlName": string | null
    "photos": {
        "small": string | null
        "large": string | null
    },
    "status": string | null
    "followed": boolean
}


type CountryType = {
    country: string
    citi: string
}
// обьект initialState задает начальное значение state, если он не придет сразу
export let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10
}

// обьект initialState задает начальное значение state, если он не придет сразу
export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: [...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                // users: [...state.users]
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USER: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export default usersReducer;

export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UsersType>) => ({type: SET_USER, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_COUNT,
    count: totalUsersCount
} as const)
export const setIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const setIsFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching, userId
} as const)

export type UsersActionType =
    ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setIsFollowingProgress>


export type GetUsersThunkCreatorType = {
    currentPage: number
    pageSize: number
    totalCount: number
}

// type ThunkType = ThunkAction<void, AllAppStateType, unknown, ActionType>
export const requestUsersThunkCreator = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

type ThunkType = BaseThunkType<UsersActionType>;

let followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<any>, actionCreator: (userId: number) => UsersActionType) => {
    dispatch(setIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
          await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
        } catch (reject) {
            return reject.data.data.error
        }
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}


//refactoring ублирования кода
// export const follow = (userId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(setIsFollowingProgress(true, userId));
//         let data = await usersAPI.follow(userId);
//         if (data.data.resultCode == 0) {
//             dispatch(followSuccess(userId))
//         }
//         dispatch(setIsFollowingProgress(false, userId));
//     }
// }
// export const unfollow = (userId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(setIsFollowingProgress(true, userId));
//         let data = await usersAPI.unfollow(userId);
//         if (data.data.resultCode == 0) {
//             dispatch(unfollowSuccess(userId))
//         }
//         dispatch(setIsFollowingProgress(false, userId));
//     }
// }