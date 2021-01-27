export type FriendsType = {
    name: string
    age: number
    id: number
}
export type PostsType = {
    message: string
    likes: string
    id: number
}
export type MessagesType = {
    messages: string
    id: number
}
export type DialogsType = {
    name: string
    id: number
}

export type SidebarType = {
    friends: Array<FriendsType>
}
export type ProfilePageType = {
    posts: Array<PostsType>
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type RootStateType = {
    sidebar: SidebarType
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


let state: RootStateType = {
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Dima"},
            {id: 2, name: "Jeny"},
            {id: 3, name: "Oly"},
            {id: 4, name: "Milana"},
            {id: 5, name: "Katy"},
            {id: 6, name: "Andrey"},
        ],
        messages: [
            {id: 1, messages: "Hi"},
            {id: 2, messages: "How is your It-kamasutra?"},
            {id: 3, messages: "Yo"},
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: "Hey, why nobody love me", likes: "15"},
            {id: 2, message: "It`s our new program! Hey", likes: "20"},
        ]
    },
    sidebar: {
        friends: [
            {name: "Andrew", age: 32, id: 1},
            {name: "Sasha", age: 33, id: 2},
            {name: "Sveta", age: 29, id: 3},
        ]
    }
}

export default state;