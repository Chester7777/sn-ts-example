import React from "react";
import {addMessage, DialogsPageType, MessagesType} from "../../redux/state";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


type PropsType = {
    dialogsPage: DialogsPageType
    addMessage: () => void
    updateNewMessageText: (newMessage: string) => void
    newMessageText: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem id={d.id} name={d.name}/>)
    const messagesElement = props.dialogsPage.messages.map((m) => <Message id={m.id} messages={m.messages}
                                                                           addMessage={props.addMessage} updateNewMessageText={props.updateNewMessageText} newMessageText={props.newMessageText}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems + " " + s.active}>
                <img src="https://i.pinimg.com/originals/9a/da/3b/9ada3bc305a1f45eab527f60da172d53.png" alt=""/>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm4B-uFtqzkLT-t0vUQtY3tZmoPuPASXzjDw&usqp=CAU"
                    alt=""/>
                <img
                    src="https://socialniesety.ru/files/images/components/articles_journal/originals/instagram/422/kak_sdelat_artavatarku_v_instagram_18.jpg"
                    alt=""/>
                <img src="https://linedot.ru/wp-content/uploads/2019/10/avatarki-dlya-steam_11.jpg" alt=""/>
                <img
                    src="https://avatars.mds.yandex.net/get-zen_doc/235144/pub_5d92e1109c944600ae6bfc5d_5d92e1c7aad43600adecf124/scale_1200"
                    alt=""/>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_O0f0c1A4kOSifv2lykdbjhhXF5r6N-9kw&usqp=CAU"
                    alt=""/>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    )
}

export default Dialogs;



