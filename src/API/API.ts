import axios from "axios";
import {UsersType} from "../redux/users-reducer";

export const instance = axios.create({
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


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export type LoginAuthResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export type MeResponseType = {
    data: {
        id: string
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export type LoginResponseType = {
    data: {
        userId: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export type GetProfileResponseType = {
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


