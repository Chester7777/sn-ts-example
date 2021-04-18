import {usersAPI} from "../API/API";
import {Dispatch} from "redux";


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
let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

// обьект initialState задает начальное значение state, если он не придет сразу
const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
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
    return (dispatch: Dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(setIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.follow(userId).then(data => {
            if (data.data.resultCode == 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(setIsFollowingProgress(false, userId));
        })
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.unfollow(userId).then(data => {
            if (data.data.resultCode == 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(setIsFollowingProgress(false, userId));
        })
    }
}