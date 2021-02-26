import {combineReducers, createStore, Store} from "redux";
import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

// функция combineReducers склеивает reducer, тоесть создает state
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
})

// функция создает store
let store: Store = createStore(reducers);
export type AllAppStateType = ReturnType<typeof reducers>

export default store;