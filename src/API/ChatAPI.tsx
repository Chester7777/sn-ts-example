const subscribers = {
    "messages-received": [] as MessagesReceivedSubscribesType[],
    "status-changed": [] as StatusChangedSubscribesType[],
};

let ws: WebSocket | null = null;

type EventsNamesType = "messages-received" | "status-changed"


const closeHandler = () => {
    notifySubscribersAboutStatus("pending");
    setTimeout(creatChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subscribers["messages-received"].forEach(s => s(newMessage))
};
const openHandler = () => {
    notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
    notifySubscribersAboutStatus("error");
    console.error("Refresh page");
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);1
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusChangedType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function creatChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus("pending");
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);
};

export const chatAPI = {
    start() {
        creatChannel()
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribers(eventNAme: EventsNamesType, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventNAme].push(callback)
        //отписаться
        return () => {
            // @ts-ignore
            subscribers[eventNAme] = subscribers[eventNAme].filter(s => s !== callback)
        }
    },
    //второй вариант отписаться
    unsubscribe(eventNAme: EventsNamesType, callback: MessagesReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventNAme] = subscribers[eventNAme].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type StatusChangedType = "pending" | "ready" | "error";
type MessagesReceivedSubscribesType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribesType = (status: StatusChangedType) => void

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
