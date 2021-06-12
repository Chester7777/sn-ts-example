import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";


const Header: React.FC<PropsType> = (props) => {

    return <header className={s.header}>
        <img
            src="https://placeitmarketing.s3.amazonaws.com/public/custompages/logo-maker/Esports-Logo-Maker.png"/>
        <div className={s.loginBlock}>
            {props.isAuth ?
                <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={"/login"}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;