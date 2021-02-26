import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Music from "./Components/Music/Music";
import Navbar from "./Components/Navbar/Navbar";
import News from "./Components/News/news";
import Profile from "./Components/Profile/Profile";
import Setting from "./Components/Setting/Setting";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";

type AppType = {}


const App: React.FC<AppType> = () => {
    // const state = props.store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar />
                <div className="app-wrapper-content">

 {/*Route - реактовская компонента, которая при совпадении с ее path позовет колбэк находящийся в ней*/}
                    <Route path="/dialogs" render={() => <DialogsContainer />}/>
                    <Route path="/profile" render={() => <Profile />}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Setting/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}


export default App;