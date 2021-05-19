import React from "react";
import s from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import userPhoto from "../../asseds/images/user.png";
import {NavLink} from "react-router-dom"
import {Paginator} from "../Common/Paginator/Paginator";


type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    portionSize: number
    followingInProgress: Array<number>
}
type PostPropsType = {
    id: number
    resultCode: number
}


let Users = (props: PropsType) => {
    let pageCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        <Paginator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   totalItemsCount={props.totalItemsCount}
                   pageSize={props.pageSize}
                   portionSize={props.portionSize}/>
        {/*<div>*/}
        {/*    {pages.map(p => {*/}
        {/*        return <span*/}
        {/*            key={p}*/}
        {/*            className={props.currentPage === p ? s.selectedPage : ""}*/}
        {/*            onClick={(e) => props.onPageChanged(p)}*/}
        {/*        >{p}</span>*/}
        {/*    })}*/}
        {/*</div>*/}
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
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id)

                                }}>unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
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