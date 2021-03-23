import axios from "axios";
import {GetTasksResponseType} from "../Components/Users/UsersContainer";
import {PostPropsType} from "../redux/auth-reducer";

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
    deleteUsers(id: number) {
       return  instance.delete(`follow/${id}`).then(response => response.data)
    },
    postUsers(id: number) {
       return  instance.post<PostPropsType>(`follow/${id}`).then(response => response.data)
    },
    getAuth () {
        return instance.get<PostPropsType>(`auth/me`).then(response => response.data)
    }
}
//id: number, email: string, login: string, isAuth: boolean

