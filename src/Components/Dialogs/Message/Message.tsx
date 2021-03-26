import React from "react";
import s from "./../Dialog.module.css";


type MessagesType = {
     id: number

    messages: string
    // newMessageText: string
}




const Message: React.FC<MessagesType> = (props) => {

    // let messagesElement = React.createRef<HTMLTextAreaElement>();
    //
    // let addMessages = () => {
    //    props.dispatch(addMessagesActionCreator());
    // }
    //
    // let onMessageChange = () => {
    //     if (messagesElement.current) {
    //         props.dispatch(onMessageChangeActionCreator(messagesElement.current.value));
    //     }
    // }

    return (
        <div>
            <div className={s.message}>{props.messages}</div>
            {/*<div>*/}
            {/*    /!*<div className={s.addText}>*!/*/}
            {/*    /!*    <textarea onChange={onMessageChange} ref={messagesElement} value={props.newMessageText}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div className={s.addTextButton}>*!/*/}
            {/*    /!*    <button onClick={addMessages}></button>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
        </div>
    )
}

export default Message;



