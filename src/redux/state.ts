let rerenderEntireTree = (state: RootStateType) => {
    console.log("State changed")
}
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
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
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
        ],
        newMessageText: "new Text",
    },
    profilePage: {
        posts: [
            {id: 1, message: "Hey, why nobody love me", likes: "15"},
            {id: 2, message: "It`s our new program! Hey", likes: "20"},
        ],
        newPostText: "It-kamasutra"
    },
    sidebar: {
        friends: [
            {name: "Andrew", age: 32, id: 1},
            {name: "Sasha", age: 33, id: 2},
            {name: "Sveta", age: 29, id: 3},
        ]
    }
}

export let addPost = () => {
    const newPost: PostsType = {
        id: 3,
        message: state.profilePage.newPostText,
        likes: "0"
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
}

export let addMessage = () => {
    const newMessage = {
        id: 4,
        messages: state.dialogsPage.newMessageText,
    }
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = "";
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export let updateNewMessageText = (newMessage: string) => {
    state.dialogsPage.newMessageText = newMessage;
    rerenderEntireTree(state);
}

export const subscribe = (observer: (state:RootStateType ) => void) => {
    rerenderEntireTree = observer;
}

export default state;