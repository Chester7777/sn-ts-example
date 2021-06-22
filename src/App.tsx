import React, {lazy} from "react";
import "antd/dist/antd.css";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import Music from "./Components/Music/Music";
import News from "./Components/News/news";
import Setting from "./Components/Setting/Setting";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AllAppStateType} from "./redux/Redux-store";
import Preloader from "./Components/Common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import {WithSuspense} from "./Components/HOC/WithSuspense";
import {UsersPage} from "./Components/Users/UsersContainer";
import {Breadcrumb, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {Header} from "./Components/Header/Header";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

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
                <Layout>
                    <Header/>
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    // defaultSelectedKeys={['1']}
                                    // defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}
                                >
                                    <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                        <Menu.Item key="1">
                                            <Link to="/profile">Profile</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/dialogs">Massages</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">

                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to="/news">News</Link>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                        <Menu.Item key="5">
                                            <Link to="/developers">Developers</Link>
                                        </Menu.Item>
                                        <Menu.Item key="6">
                                            <Link to="/news">News</Link>
                                        </Menu.Item>
                                        <Menu.Item key="7">
                                            <Link to="/music">Music</Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">

                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Settings">
                                        <Menu.Item key="9">
                                            <Link to="/settings">Settings</Link>
                                        </Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                <Switch>
                                    {/*Route - реактовская компонента, которая при совпадении с ее path позовет колбэк находящийся в ней*/}
                                    <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                                    <Route path="/dialogs" render={WithSuspense(DialogsContainer)}/>
                                    <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)}/>
                                    <Route path="/news" render={() => <News/>}/>
                                    <Route path="/music" render={() => <Music/>}/>
                                    <Route path="/settings" render={() => <Setting/>}/>
                                    <Route path="/developers" render={() => <UsersPage pageTitle={"User"}/>}/>
                                    <Route path="/login" render={() => <Login/>}/>
                                    <Route path="*" render={() => <div><b>404 NOT FOUND</b></div>}/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Sotial Network ©2021 Created by Chausov</Footer>
                </Layout>

                {/*без Ant Design*/}
                {/*<div className="app-wrapper">*/}
                {/*    <HeaderContainer/>*/}
                {/*    <Navbar/>*/}
                {/*    <div className="app-wrapper-content">*/}
                {/*        <Switch>*/}
                {/*            /!*Route - реактовская компонента, которая при совпадении с ее path позовет колбэк находящийся в ней*!/*/}
                {/*            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>*/}
                {/*            <Route path="/dialogs" render={WithSuspense(DialogsContainer)}/>*/}
                {/*            <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)}/>*/}
                {/*            <Route path="/news" render={() => <News/>}/>*/}
                {/*            <Route path="/music" render={() => <Music/>}/>*/}
                {/*            <Route path="/settings" render={() => <Setting/>}/>*/}
                {/*            <Route path="/users" render={() => <UsersPage pageTitle={"User"}/>}/>*/}
                {/*            <Route path="/login" render={() => <Login/>}/>*/}
                {/*            <Route path="*" render={() => <div><b>404 NOT FOUND</b></div>}/>*/}
                {/*        </Switch>*/}
                {/*    </div>*/}
                {/*    <Button >OK</Button>*/}
                {/*</div>*/}
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