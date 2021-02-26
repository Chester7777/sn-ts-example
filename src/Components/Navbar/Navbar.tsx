import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import Friend from "../Sidebar/friend";
import {FriendsType} from "../../redux/store";

type NavbarType = {
    //friends: Array<FriendsType>
}

const Navbar = (props: NavbarType) => {


    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>

{/*меняет url в браузере без перезакрузки страницы*/}
                <NavLink activeClassName={s.active} to="/profile">Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/dialogs">Massages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/news">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/music">Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.active} to="/settings">Settings</NavLink>
            </div>
            <div>
                {/*<Friend friends={props.friends}/>*/}
            </div>
        </nav>
    )
}

export default Navbar;