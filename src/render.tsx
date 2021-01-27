import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {addMessage, addPost, RootStateType, updateNewMessageText, updateNewPostText} from "./redux/state";

type addPostType = {
    addPost: () => void
    addMessage: () => void
    updateNewPostText: (newText: string) => void
    updateNewMessageText: (newMessage: string) => void
    newMessageText: string
}
export let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                state={state}
                addPost={addPost}
                addMessage={addMessage}
                updateNewPostText={updateNewPostText}
                updateNewMessageText={updateNewMessageText}
                newMessageText={state.dialogsPage.newMessageText}

            />
        </React.StrictMode>,
        document.getElementById("root")
    );
}
