import {Dispatch} from "redux";
import {BaseThunkType} from "./Redux-store";
import {chatAPI, ChatMessageType} from "../API/ChatAPI";
import {message} from "antd";

const SET_MESSAGES_RECEIVED = "sn/chat/SET_MESSAGES_RECEIVED";
type ActionsType = SetChatMessagesType

export type InitialStateType = {
    messages: ChatMessageType[]
}

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export type SetChatMessagesType = {
    type: typeof SET_MESSAGES_RECEIVED
    payload: InitialStateType
}

type ThunkType = BaseThunkType<ActionsType>;

export const messagesReceived = (messages: ChatMessageType[]): SetChatMessagesType => ({
    type: SET_MESSAGES_RECEIVED, payload: {messages}
} as const);

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessages = (message: string): ThunkType => async (dispatch: Dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;