import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";
import {exists} from "fs";

// функция combineReducers склеивает reducer, тоесть создает state
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// расширение (REDUX_DEVTOOLS_EXTENSION)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// или
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// расширение (REDUX_DEVTOOLS_EXTENSION)
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));


// функция создает store
// let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AllAppStateType = ReturnType<typeof reducers>
export type AppStoreType = typeof store

export default store;

// @ts-ignore
window.store = store