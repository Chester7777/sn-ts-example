import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType} from "./Redux-store";
import {profileAPI} from "../API/ProfileAPI";


const ADD_POST = "sn/PROFILE/ADD-POST";
const DELETE_POST = "sn/PROFILE/DELETE_POST";
const SET_USER_PROFILE = "sn/PROFILE/SET_USER_PROFILE";
const SET_STATUS = "sn/PROFILE/SET_STATUS";
const SAVE_PHOTO_SUCCESS = "sn/PROFILE/SAVE_PHOTO_SUCCESS";

export type PostsType = {
    id: number
    message: string
    likes: string
};
export type ContactsType = {
    facebook: string,
    website: null,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: null,
    github: string,
    mainLink: null
};
export type PhotosType = {
    small: string,
    large: string
};
export type ProfilePropsType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
};


export type InitialStateType = typeof initialState;

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    posts: [
        {id: 1, message: "Hey, why nobody love me", likes: "15"},
        {id: 2, message: "It`s our new program! Hey", likes: "20"},
    ] as Array<PostsType>,
    profile: null as ProfilePropsType | null,
    status: ""
};

// обьект initialState задает начальное значение state, если он не придет сразу
const profilePageReducer = (state = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                message: action.newPostText,
                likes: "0"
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: state.profile && {...state.profile, photos: action.photos}
            }

        default:
            return state;
    }

}
export const addPostsActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText} as const);
export const deletePostsActionCreator = (postId: number) => ({type: DELETE_POST, postId} as const);
export const setUserProfile = (profile: ProfilePropsType) => ({type: SET_USER_PROFILE, profile} as const);
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const);
export const savePhotoSuccess = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const);

type ThunkType = BaseThunkType<ProfileActionType | FormAction>;

export const getUserProfile = (userId: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
    }
export const getStatus = (userId: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data))
    }
export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
export const savePhoto = (file: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }

export const saveProfile = (profile: ProfilePropsType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }


export type ProfileActionType =
    ReturnType<typeof addPostsActionCreator> |
    ReturnType<typeof deletePostsActionCreator> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof savePhotoSuccess>

export default profilePageReducer;