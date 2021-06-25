import React, {useEffect, useState} from "react";


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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log("CLOSE WS")
            setTimeout(creatChannel, 3000)
        };

        function creatChannel() {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        };
        creatChannel();

        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    }, []);


    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessagesForm wsChannel={wsChannel}/>
    </div>
}
export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        };
        wsChannel?.addEventListener("message", messageHandler)

        return () => {
            wsChannel?.removeEventListener("message", messageHandler)
        }
    }, [wsChannel]);


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
export const AddMessagesForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus("ready")
        };
        wsChannel?.addEventListener("open", openHandler)

        return () => {
            wsChannel?.removeEventListener("open", openHandler)
        }
    }, [wsChannel]);

    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message);
        setMessage("");
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel === null || readyStatus !== "ready"} onClick={sendMessage}>send</button>
        </div>
    </div>
}


export default ChatPage;