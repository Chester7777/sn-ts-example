import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {MainAppContainer} from "./App";

ReactDOM.render(<MainAppContainer/>, document.getElementById("root"));


// эта компонента отрисовывает мое приложение
// export let rerenderEntireTree = () => {
//
// }
// rerenderEntireTree();

// store.subscribe(rerenderEntireTree);

reportWebVitals();
