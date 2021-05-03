import axios from "axios";
import {GetTasksResponseType} from "../Components/Users/UsersContainer";
import {PostPropsType} from "../redux/auth-reducer";
import {ProfilePropsType, StatusProfileType} from "../redux/profilePage-reducer";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "0b171657-160a-4f70-93fb-80213f27dfbf"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetTasksResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<LoginAuthResponseType>(`follow/${id}`)
        // .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<PostPropsType>(`follow/${id}`)
        // .then(response => response.data)
    }
}
//
type GetProfileResponseType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<StatusProfileType>(`profile/status`, {status: status})
    }
}

type MeResponseType = {
    data: {
        id: string
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export type LoginAuthResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`);
    },
    login(email: string, password: number, rememberMe: boolean) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe})
    },
    loginAuth() {
        return instance.delete<LoginAuthResponseType>(`auth/login`)
    }
}
