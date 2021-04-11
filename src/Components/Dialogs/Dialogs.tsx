import React from "react";
import s from "./Dialog.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";
import {AddMassageFormType, AddMessageFormRedux} from "./Message/AddMassageForm";


const Dialogs = (props: DialogsPropsType) => {
    let messagesElement = React.createRef<HTMLTextAreaElement>();
    // let newMessageBody = state.newMessageText

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem id={d.id} name={d.name}/>)
    const messagesElements = props.dialogsPage.messages.map((m) => <Message id={m.id} messages={m.messages}/>)

    // let addMessages = () => {
    //     props.addMessages()
    // }
    let addNewMessage = (values: AddMassageFormType) => {
       props.addMessages(values.newMessageText);
    }

    // let onMessageChange = () => {
    //     if (messagesElement.current) {
    //         let body = messagesElement.current.value
    //         props.onMessageChange(body)
    //     }
    // }
    if(!props.isAuth) return <Redirect to={"/login"} />
    return (
        <div>
            <h3>Massages</h3>

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
                    <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>

                </div>
            </div>
        </div>
    )
}


export default Dialogs;



