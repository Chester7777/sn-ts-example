import React from "react";
import {InitialStateType} from "../../redux/users-reducer";
import s from "./Users.module.css"


const Users = (props: InitialStateType) => {
    if(props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://yandex.by/images/search?pos=12&img_url=https%3A%2F%2Fcs.pikabu.ru%2Fpost_img%2Fbig%2F2013%2F11%2F09%2F0%2F1383942783_1009030042.jpg&text=photo&rpt=simage&lr=157&source=wiz",
                followed: false,
                fullName: "Dmitry",
                status: "I am a boos",
                location: {country: "Belarus", citi: "Minsk"}
            },
            {
                id: 2,
                photoUrl: "https://yandex.by/images/search?source=related-query-serp&text=photo+girl+without+face&pos=15&rpt=simage&nomisspell=1&img_url=https%3A%2F%2Fimages.psketch.com%2FFrZyezFFRgx2pNc_PMdL0RsZR3QF%3Fattname%3Dpsketch.png&lr=157",
                followed: true,
                fullName: "Sasha",
                status: "I am a boos too",
                location: {country: "Russia", citi: "Moscow"}
            },
            {
                id: 3,
                photoUrl: "https://yandex.by/images/search?source=related-query-serp&text=photo+girl+without+face&pos=15&rpt=simage&nomisspell=1&img_url=https%3A%2F%2Fimages.psketch.com%2FFrZyezFFRgx2pNc_PMdL0RsZR3QF%3Fattname%3Dpsketch.png&lr=157",
                followed: false,
                fullName: "Andrew",
                status: "I am a boos too",
                location: {country: "Ukraine", citi: "Kiev"}
            },
        ])
    }

    return <div>
        {
            props.users.map(u => {
                <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                                : <button onClick={() => {props.follow(u.id)}}>follow</button>
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
            })
        }

    </div>

}

export default Users;