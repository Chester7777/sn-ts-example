import React from "react";
import s from "./Users.module.css"
import {UsersPropsType} from "./UsersContainer";


const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://im0-tub-ru.yandex.net/i?id=1564003cf2c85044c1c51b0ba54371e8&ref=rim&n=33&w=237&h=188",
                followed: false,
                fullName: "Dmitry",
                status: "I am a boos",
                location: {country: "Belarus", citi: "Minsk"}
            },
            {
                id: 2,
                photoUrl: "https://im0-tub-ru.yandex.net/i?id=e38802855eba821955bd1cd2fc4ae75a&ref=rim&n=33&w=150&h=188",
                followed: true,
                fullName: "Sasha",
                status: "I am a boos too",
                location: {country: "Russia", citi: "Moscow"}
            },
            {
                id: 3,
                photoUrl: "https://s1.1zoom.ru/b5050/316/388459-blackangel_1600x1200.jpg",
                followed: false,
                fullName: "Andrew",
                status: "I am a boos too",
                location: {country: "Ukraine", citi: "Kiev"}
            },
        ])
    }

    return <div>
        {
            props.users.map((u: any) => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
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
                                {u.fullName}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {u.location.country}
                            </div>
                            <div>
                                {u.location.citi}
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