export type FriendsType = {
    id: number
    age: number
    name: string
}

export type InitialStateType = typeof initialState
// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    friends: [
        {name: "Andrew", age: 32, id: 1},
        {name: "Sasha", age: 33, id: 2},
        {name: "Sveta", age: 29, id: 3},
    ] as Array<FriendsType>,
}

// обьект initialState задает начальное значение state, если он не придет сразу
const sidebarReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {

    return state;
}

export default sidebarReducer;