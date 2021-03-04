import React from "react";
import s from "./Users.module.css"
import {UsersPropsType} from "./UsersContainer";
import {UsersType} from "../../redux/users-reducer";
import userPhoto from "../../asseds/images/user.png"
import axios from "axios";



type GetTasksResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        axios.get<GetTasksResponseType>("https://social-network.samuraijs.com/api/1.0/users").then(response => {

            props.setUsers(response.data.items)
        })
    }


    return <div>

        {
            props.users.map((u: UsersType) => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>
                                {u.name}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {"u.location.country"}
                            </div>
                            <div>
                                {"u.location.citi"}
                            </div>
                        </span>
                    </span>
                    </div>
                }
            )

        }

    </div>

}

export default Users;