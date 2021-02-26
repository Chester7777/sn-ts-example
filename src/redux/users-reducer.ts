import {ActionType} from "./store";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER = "SET_USER";

export type InitialStateType = {
    users: Array<UsersType>
}

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: CountryType
}
type CountryType = {
    country: string
    citi: string
}
// обьект initialState задает начальное значение state, если он не придет сразу
let initialState: InitialStateType = {
    users: [ ],
}

// обьект initialState задает начальное значение state, если он не придет сразу
const usersReducer = (state:InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: [...state.users],
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
        case SET_USER:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default:
            return state;
    }
}


export const followAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUserAC = (users: Array<UsersType>) => ({type: SET_USER,  users} as const)

export default usersReducer;