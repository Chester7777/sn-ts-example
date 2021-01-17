import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Dialog.module.css";


type  DialogItemPropsType = {
    name: string
    id: number
}

type MessagePropsType = {
    messages: string
}

const DialogItem = (props: DialogItemPropsType) => {
    let path = "/dialogs/1" + props.id;
    return (

        <div className={s.dialogsItems + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props: MessagePropsType) => {
    return (
        <div className={s.messages}>
            <div className={s.message}>{props.messages}</div>
        </div>
    )
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems + " " + s.active}>
                <DialogItem id={1} name="Dima"/>
                <DialogItem id={2} name="Jeny"/>
                <DialogItem id={3} name="Oly"/>
                <DialogItem id={4} name="Milana"/>
                <DialogItem id={5} name="Katy"/>
                <DialogItem id={6} name="Andrey"/>
            </div>
            <div className={s.messages}>
                <Message messages="Hi"/>
                <Message messages="How is your It-kamasutra?"/>
                <Message messages="Yo"/>
            </div>
        </div>
    )
}

export default Dialogs;