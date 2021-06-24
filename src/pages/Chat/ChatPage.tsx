import React, {useEffect, useState} from "react";

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {

    return <div>
        <Chat/>
    </div>
}

export const Chat: React.FC = () => {


    return <div>
        <Messages/>
        <AddMessagesForm/>
    </div>
}
export const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener("message", (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        })
    }, []);


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
export const AddMessagesForm: React.FC = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if(!message) {
            return;
        }
        ws.send(message);
        setMessage("");
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}>send</button>
        </div>
    </div>
}


export default ChatPage;