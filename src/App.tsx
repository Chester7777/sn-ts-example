import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Dialogs from "./Components/Dialogs/Dialogs";
import Header from "./Components/Header/Header";
import Music from "./Components/Music/Music";
import Navbar from "./Components/Navbar/Navbar";
import News from "./Components/News/news";
import Profile from "./Components/Profile/Profile";
import Setting from "./Components/Setting/Setting";
import DialogItem from "./Components/Dialogs/DialogItem/DialogItem";
import Message from "./Components/Dialogs/Message/Message";
import {addMessage, DialogsPageType, ProfilePageType, RootStateType} from "./redux/state";

type AppType = {
    state: RootStateType
    addPost: () => void
    addMessage: () => void
    updateNewPostText: (newText: string) => void
    updateNewMessageText: (newMessage: string) => void
    newMessageText: string
}


const App: React.FC<AppType> = (props) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar friends={props.state.sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs"
                           render={() => <Dialogs
                               dialogsPage={props.state.dialogsPage}
                               addMessage={props.addMessage}
                               newMessageText={props.newMessageText}
                               updateNewMessageText={props.updateNewMessageText}
                           />}

                    />
                    <Route path="/profile"
                           render={() => <Profile
                               profilePage={props.state.profilePage}
                               addPost={props.addPost}
                               updateNewPostText={props.updateNewPostText}
                           />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Setting/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}


export default App;