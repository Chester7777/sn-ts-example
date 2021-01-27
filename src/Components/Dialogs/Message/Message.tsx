import React from "react";
import s from "./../Dialog.module.css";


type MessagesType = {
    messages: string
    id: number
    addMessage: () => void
    newMessageText: string
    updateNewMessageText: (newMessage: string) => void
}

const Message: React.FC<MessagesType> = (props) => {

    let messagesElement = React.createRef<HTMLTextAreaElement>();

    let addMessages = () => {
       props.addMessage();
    }

    let onMessageChange = () => {
        if (messagesElement.current) {
            props.updateNewMessageText(messagesElement.current.value);
        }
    }

    return (
        <div className={s.messages}>
            <div className={s.message}>{props.messages}</div>
            <div>
                <div className={s.addText}>
                    <textarea onChange={onMessageChange} ref={messagesElement} value={props.newMessageText}/>
                </div>
                <div className={s.addTextButton}>
                    <button onClick={addMessages}></button>
                </div>
            </div>
        </div>
    )
}

export default Message;



