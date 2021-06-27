import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../API/ChatAPI";
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
    const status = useSelector((state: AllAppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);


    return <div>
        {status === "error" && <div>Some error occurred. Please refresh the page</div>}
        <>
            <Messages/>
            <AddMessagesForm/>
        </>
    </div>
}
export const Messages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const messages = useSelector((state: AllAppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        var element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    //автоматическая перемотка скрола вниз при получении нового сообщения
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div style={{height: "400px", overflowY: "auto"}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.userId} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}
export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

        return <div>
            <img style={{width: "30px"}} src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    }
)
export const AddMessagesForm: React.FC = () => {
    const [message, setMessage] = useState("");
    const status = useSelector((state: AllAppStateType) => state.chat.status);
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
            <button disabled={status !== "ready"} onClick={sendMessageHandler}>send</button>
        </div>
    </div>
}


export default ChatPage;