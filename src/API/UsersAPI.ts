import {instance, LoginAuthResponseType} from "./API";
import {UsersType} from "../redux/users-reducer";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = "", friend: null | boolean = null) {
        return instance.get<GetTasksResponseType>(
            `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`)
        )
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<LoginAuthResponseType>(`follow/${id}`)
        // .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<any>(`follow/${id}`)
        // .then(response => response.data)
    }
}
export type GetTasksResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
// export type FollowPostPropsType = {
//     data: {},
//     messages: [],
//     resultCode: number
// }