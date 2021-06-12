import React from "react";
import {NavLink} from "react-router-dom";
import s from "./../Dialog.module.css";
import {DialogsType} from "../../../redux/store";

const DialogItem: React.FC<DialogsType> = (props) => {

    let path = "/dialogs/1" + props.id;

    return (
        <div className={s.dialogsItems + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;



