import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Music from "./Components/Music/Music";
import Navbar from "./Components/Navbar/Navbar";
import News from "./Components/News/news";
import Setting from "./Components/Setting/Setting";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer"
import Login from "./Components/Login/Login";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {AllAppStateType} from "./redux/Redux-store";
import Preloader from "./Components/Common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer"


type AppType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        {/*Route - реактовская компонента, которая при совпадении с ее path позовет колбэк находящийся в ней*/}
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Setting/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state: AllAppStateType) => ({
    initialized: state.app.initialized
})
// const mapDispatchToProps = (state: AllAppStateType) => ({
//     getAuthUserData:
// })

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);