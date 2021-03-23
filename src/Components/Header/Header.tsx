import React from "react";
import s from "./Header.module.css";
import {PostPropsType} from "../../redux/auth-reducer";
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";


const Header = (props: PropsType) => {
    return <header className={s.header}>
        <img
            src="https://placeitmarketing.s3.amazonaws.com/public/custompages/logo-maker/Esports-Logo-Maker.png"
            alt=""/>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
                : <NavLink to={"/login"}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;