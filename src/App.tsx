import React, {lazy} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import Music from "./Components/Music/Music";
import Navbar from "./Components/Navbar/Navbar";
import News from "./Components/News/news";
import Setting from "./Components/Setting/Setting";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer"
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AllAppStateType} from "./redux/Redux-store";
import Preloader from "./Components/Common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import {WithSuspense} from "./Components/HOC/WithSuspense";

const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"));
const ProfileContainer = lazy(() => import("./Components/Profile/ProfileContainer"));


type AppType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppType> {

    catchAllUnhandledErrors(promiseRejectionEvent: any) {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledRejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledRejection", this.catchAllUnhandledErrors);
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
                        <Switch>
                            {/*Route - реактовская компонента, которая при совпадении с ее path позовет колбэк находящийся в ней*/}
                            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/dialogs" render={WithSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)}/>
                            <Route path="/news" render={() => <News/>}/>
                            <Route path="/music" render={() => <Music/>}/>
                            <Route path="/settings" render={() => <Setting/>}/>
                            <Route path="/users" render={() => <UsersContainer/>}/>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="*" render={() => <div><b>404 NOT FOUND</b></div>}/>
                        </Switch>
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

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App);

export let MainAppContainer = () => {

    // обернули APP что бы наши страницы переключались без перезагрузки
    return <React.StrictMode>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </React.StrictMode>
}