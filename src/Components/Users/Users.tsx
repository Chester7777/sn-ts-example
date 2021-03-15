import React from "react";
import s from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import userPhoto from "../../asseds/images/user.png";
import {OnPageChangedType, UsersPropsType} from "./UsersContainer";
import {NavLink} from "react-router-dom"


type PropsType = OnPageChangedType & UsersPropsType

let Users = (props: PropsType) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span
                    key={p}
                    className={props.currentPage === p ? s.selectedPage : ""}
                    onClick={(e) => props.onPageChanged(p)}
                >{p}</span>})}
        </div>
        {/*использовал до componentDidMount*/}
        {/*<button onClick={this.props.getUsers}>get users</button>*/}
        {
            props.users.map((u: UsersType) => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"./profile/" + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
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