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

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get<GetTasksResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
       return  instance.delete(`follow/${id}`)
           // .then(response => response.data)
    },
    follow(id: number) {
       return  instance.post<PostPropsType>(`follow/${id}`)
           // .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile (userId: string) {
       return  instance.get(`profile/` + userId);
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus (status: string) {
        return instance.put<StatusProfileType>(`profile/status`, {status: status})
    }

}

export const authAPI = {
    me () {
        return instance.get(`auth/me`);
    },
    login (email: string, password: number, rememberMe: boolean) {
        return instance.post<any>(`auth/login`, {email, password, rememberMe})
    },
    loginAuth () {
        return instance.delete(`auth/login`)
    }
}
