import {ActionType, SidebarType} from "./store";

// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    friends: [
        {name: "Andrew", age: 32, id: 1},
        {name: "Sasha", age: 33, id: 2},
        {name: "Sveta", age: 29, id: 3},
    ]
}

// обьект initialState задает начальное значение state, если он не придет сразу
const sidebarReducer = (state: SidebarType = initialState, action: ActionType) => {

    return state;
}

export default sidebarReducer;