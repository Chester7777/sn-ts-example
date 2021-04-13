import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

// функция combineReducers склеивает reducer, тоесть создает state
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

// функция создает store
let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type AllAppStateType = ReturnType<typeof reducers>
export type AppStoreType = typeof store

export default store;

// @ts-ignore
window.store = store