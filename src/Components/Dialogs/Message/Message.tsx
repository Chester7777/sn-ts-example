import React from "react";
import s from "./../Dialog.module.css";
import {MessagesType} from "../../../redux/state";



const Message: React.FC<MessagesType> = (props) => {
    return (
        <div className={s.messages}>
            <div className={s.message}>{props.messages}</div>
        </div>
    )
}

export default Message;



