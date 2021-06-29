import {Dispatch} from "redux";
import {BaseThunkType} from "./Redux-store";
import {chatAPI, ChatMessageAPIType, StatusChangedType} from "../API/ChatAPI";
import {v1} from "uuid";



const SET_MESSAGES_RECEIVED = "sn/chat/SET_MESSAGES_RECEIVED";
const SET_STATUS_CHANGED = "sn/chat/SET_STATUS_CHANGED";
type ActionsType = SetChatMessagesType | SetStatusChanged;
export type ChatMessageType = ChatMessageAPIType & {id: string}

export type InitialStateType = {
    messages: ChatMessageType[]
    status: StatusChangedType
}


let initialState = {
    messages: [] as ChatMessageAPIType[],
    status: "pending" as StatusChangedType
}

const chatReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    .map(m => ({...m, id: v1()}))]
                    .filter((m, index, arr) => index >= arr.length - 100 )
            }
        case SET_STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export type SetChatMessagesType = {
    type: typeof SET_MESSAGES_RECEIVED
    payload: InitialStateType
}
export type SetStatusChanged = {
    type: typeof SET_STATUS_CHANGED
    payload: InitialStateType
}

type ThunkType = BaseThunkType<ActionsType>;

export const messagesReceived = (messages: ChatMessageAPIType[]) => ({
    type: SET_MESSAGES_RECEIVED, payload: {messages}
} as const);
export const statusChanged = (status: StatusChangedType) => ({
    type: SET_STATUS_CHANGED, payload: {status}
} as const);

let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusChangedType) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessagesHandler
};
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.start()
    chatAPI.subscribers("messages-received", newMessagesHandlerCreator(dispatch))
    chatAPI.subscribers("status-changed", statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessages = (message: string): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;