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
//import {BrowserRouter, Route} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" component={Dialogs}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/news" component={News} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Setting} />
                </div>
            </div>
        </BrowserRouter>

        //     {/*/!*<Route path={"/hallo"} render={() => <HalloMassage massage={"Hallo my friends"}/>}/>*!/*/}
        //     {/*<Route path={"/bye"} render={() => <ByeMassage massage={"Bye my incubatr"}/>}/>*/}


    )
}


// type MassageType = {
//     massage: string
// }
//
// function HalloMassage(props: MassageType) {
//     return <h1>{props.massage}</h1>
// }
//
// const ByeMassage: React.FC<MassageType> = (props) => {
//     return <h2>{props.massage}</h2>
// }


export default App;