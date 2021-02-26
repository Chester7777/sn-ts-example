import {ActionType} from "./store";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    messages: string
}

export type initialStateType = typeof initialState

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: "Dima"},
        {id: 2, name: "Jeny"},
        {id: 3, name: "Oly"},
        {id: 4, name: "Milana"},
        {id: 5, name: "Katy"},
        {id: 6, name: "Andrey"},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, messages: "Hi"},
        {id: 2, messages: "How is your It-kamasutra?"},
        {id: 3, messages: "Yo"},
    ] as Array<MessagesType>,
    newMessageText: "",
}

// обьект initialState задает начальное значение state, если он не придет сразу
const dialogsPageReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let body = state.newMessageText;
            return {
                ...state,
                newMessageText: "",
                messages: [...state.messages, {id: 4, messages: body}]
        }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage
        }
        default:
            return state;
    }

}

export const addMessagesActionCreator = () => ({type: ADD_MESSAGE} as const)
export const onMessageChangeActionCreator = (newMessage: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: newMessage
} as const)

export default dialogsPageReducer;