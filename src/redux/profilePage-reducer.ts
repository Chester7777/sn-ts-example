import {ActionType} from "./store";
import {UsersType} from "./users-reducer";



const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export type PostsType = {
    id: number
    message: string
    likes: string
}
export type InitialStateType = typeof initialState
// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    posts: [
        {id: 1, message: "Hey, why nobody love me", likes: "15"},
        {id: 2, message: "It`s our new program! Hey", likes: "20"},
    ] as Array<PostsType>,
    newPostText: "",
    profile: {}
}

// обьект initialState задает начальное значение state, если он не придет сразу
const profilePageReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                message: state.newPostText,
                likes: "0"
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
            case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }

}
export const addPostsActionCreator = () => ({type: ADD_POST} as const)
export const setUserProfile = (profile: UsersType) => ({type: SET_USER_PROFILE, profile} as const)
export const onPostChangeActionCreator = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)


export default profilePageReducer;