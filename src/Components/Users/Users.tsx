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
// export type RenderType = {
//     render: () => UsersPropsType
// }


export class Users extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props);
        axios.get<GetTasksResponseType>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.render().props.getUsers}>get users</button>
                {
                    this.props.users.map((u: UsersType) => {
                            return <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
        )
    }
}

export default Users;