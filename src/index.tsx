import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/Redux-store";

ReactDOM.render(
    // обернули APP что бы наши страницы переключались без перезагрузки
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);


// эта компонента отрисовывает мое приложение
// export let rerenderEntireTree = () => {
//
// }
// rerenderEntireTree();


// store.subscribe(rerenderEntireTree);

reportWebVitals();
