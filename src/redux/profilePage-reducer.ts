import {usersAPI} from "../API/API";
import {Dispatch} from "redux";


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export type PostsType = {
    id: number
    message: string
    likes: string
}
type ContactsType = {
    facebook: string,
    website: null,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: null,
    github: string,
    mainLink: null
}
type PhotosType = {
    small: string,
    large: string
}
export type ProfilePropsType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}


export type InitialStateType = typeof initialState
// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    posts: [
        {id: 1, message: "Hey, why nobody love me", likes: "15"},
        {id: 2, message: "It`s our new program! Hey", likes: "20"},
    ] as Array<PostsType>,
    newPostText: "",
    profile: {} as ProfilePropsType
}

// обьект initialState задает начальное значение state, если он не придет сразу
const profilePageReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
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
export const setUserProfile = (profile: ProfilePropsType) => ({type: SET_USER_PROFILE, profile} as const)
export const onPostChangeActionCreator = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    })
}



type ProfileActionType =
    ReturnType<typeof addPostsActionCreator> |
    ReturnType<typeof onPostChangeActionCreator> |
    ReturnType<typeof setUserProfile>

export default profilePageReducer;