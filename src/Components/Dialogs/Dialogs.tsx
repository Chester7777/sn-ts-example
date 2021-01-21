import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Dialog.module.css";

type DialogsPropsType = {
    dialogsData: DialogsDataPropsType
    messagesData: MessagesDataPropsType
}
type  DialogItemPropsType = {
    name: string
    id: number

}
type MessagePropsType = {
    messages: string
    id: number

}
type DialogsDataPropsType = {
    id: number
    name: string

}
type MessagesDataPropsType = {
    id: number
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


let dialogsData = [
    {id: 1, name: "Dima"},
    {id: 2, name: "Jeny"},
    {id: 3, name: "Oly"},
    {id: 4, name: "Milana"},
    {id: 5, name: "Katy"},
    {id: 6, name: "Andrey"},
]

let messagesData = [
    {id: 1, messages: "Hi"},
    {id: 2, messages: "How is your It-kamasutra?"},
    {id: 3, messages: "Yo"},
]

const Dialogs = (props: DialogsPropsType) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems + " " + s.active}>
                <DialogItem id={dialogsData[0].id} name={dialogsData[0].name}/>
                <DialogItem id={dialogsData[1].id} name={dialogsData[1].name}/>
                <DialogItem id={dialogsData[2].id} name={dialogsData[2].name}/>
                <DialogItem id={dialogsData[3].id} name={dialogsData[3].name}/>
                <DialogItem id={dialogsData[4].id} name={dialogsData[4].name}/>
                <DialogItem id={dialogsData[5].id} name={dialogsData[5].name}/>
            </div>
            <div className={s.messages}>
                <Message id={messagesData[0].id} messages={messagesData[0].messages}/>
                <Message id={messagesData[1].id} messages={messagesData[1].messages}/>
                <Message id={messagesData[2].id} messages={messagesData[2].messages}/>
            </div>
        </div>
    )
}

export default Dialogs;