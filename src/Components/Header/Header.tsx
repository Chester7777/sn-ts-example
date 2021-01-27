import React from "react";
import s from "./Header.module.css";



const Header = () => {
    return <header className={s.header}>
        <img
            src="https://placeitmarketing.s3.amazonaws.com/public/custompages/logo-maker/Esports-Logo-Maker.png"
            alt=""/>
    </header>
}

export default Header;