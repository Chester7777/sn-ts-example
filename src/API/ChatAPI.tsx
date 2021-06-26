let subscribers = [] as SubscribesType[];
let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log("CLOSE WS")
    setTimeout(creatChannel, 3000)
};

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessage))
};

function creatChannel() {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
};

export const chatAPI = {
    start() {
        creatChannel()
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener("close", closeHandler);
        ws?.removeEventListener("message", messageHandler);
        ws?.close();
    },
    subscribe(callback: SubscribesType) {
        subscribers.push(callback)
        //отписаться
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    //второй вариант отписаться
    unsubscribe(callback: SubscribesType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type SubscribesType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}