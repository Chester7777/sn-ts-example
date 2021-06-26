import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../API/ChatAPI";
import {useDispatch, useSelector} from "react-redux";
import {sendMessages, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AllAppStateType} from "../../redux/Redux-store";


const ChatPage: React.FC = () => {

    return <div>
        <Chat/>
    </div>
}

export const Chat: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);


    return <div>
        <Messages/>
        <AddMessagesForm/>
    </div>
}
export const Messages: React.FC<{}> = ({}) => {

    const messages = useSelector((state: AllAppStateType) => state.chat.messages)

    return <div style={{height: "400px", overflowY: "auto"}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>
}
export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <div>
        <img style={{width: "30px"}} src={message.photo}/> <b>{message.userName}</b>
        <br/>
        {message.message}

        <hr/>
    </div>
}
export const AddMessagesForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessages(message))
        setMessage("");
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>send</button>
        </div>
    </div>
}


export default ChatPage;