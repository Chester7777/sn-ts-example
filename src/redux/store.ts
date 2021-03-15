import sidebarReducer from "./sidebar-reducer";
import profilePageReducer, {
    addPostsActionCreator,
    onPostChangeActionCreator,
    setUserProfile
} from "./profilePage-reducer";
import dialogsPageReducer, {addMessagesActionCreator, onMessageChangeActionCreator} from "./dialogsPage-reducer";
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setUsers,
    setTotalUsersCount,
    unfollow
} from "./users-reducer";

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
type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
export type RootStateType = {
    sidebar: SidebarType
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: RootStateType
    _callSubscribe: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
}

type ProfilePageReducerPropsType = {
    state: DialogsPageType
    action: ActionType
}
export type ActionType =
    ReturnType<typeof addPostsActionCreator> |
    ReturnType<typeof addMessagesActionCreator> |
    ReturnType<typeof onPostChangeActionCreator> |
    ReturnType<typeof onMessageChangeActionCreator> |
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setUserProfile>



export let store: StoreType = {
    _state: {
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
            newMessageText: "",
        },
        profilePage: {
            posts: [
                {id: 1, message: "Hey, why nobody love me", likes: "15"},
                {id: 2, message: "It`s our new program! Hey", likes: "20"},
            ],
            newPostText: ""
        },
        sidebar: {
            friends: [
                {name: "Andrew", age: 32, id: 1},
                {name: "Sasha", age: 33, id: 2},
                {name: "Sveta", age: 29, id: 3},
            ]
        }
    },
    _callSubscribe() {
        console.log("State changed")
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubscribe = observer;
    },

    dispatch(action) {
        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscribe();
        //     if(action.type === ADD_POST) {
        //         const newPost: PostsType = {
        //             id: 3,
        //             message: this._state.profilePage.newPostText,
        //             likes: "0"
        //         };
        //         this._state.profilePage.posts.push(newPost);
        //         this._state.profilePage.newPostText = "";
        //         this._callSubscribe();
        //     } else if(action.type === ADD_MESSAGE) {
        //         const newMessage = {
        //             id: 4,
        //             messages: this._state.dialogsPage.newMessageText,
        //         }
        //         this._state.dialogsPage.messages.push(newMessage);
        //         this._state.dialogsPage.newMessageText = "";
        //         this._callSubscribe();
        //     } else if(action.type === UPDATE_NEW_POST_TEXT) {
        //         this._state.profilePage.newPostText = action.newText;
        //         this._callSubscribe();
        //     } else if(action.type === UPDATE_NEW_MESSAGE_TEXT) {
        //         this._state.dialogsPage.newMessageText = action.newMessage;
        //         this._callSubscribe();
        //     }
    }
}


export default store;


// window.store = store;

// addPost() {
//     const newPost: PostsType = {
//         id: 3,
//         message: this._state.profilePage.newPostText,
//         likes: "0"
//     };
//     this._state.profilePage.posts.push(newPost);
//     this._state.profilePage.newPostText = "";
//     this._callSubscribe();
// },
// addMessage() {
//     const newMessage = {
//         id: 4,
//         messages: this._state.dialogsPage.newMessageText,
//     }
//     this._state.dialogsPage.messages.push(newMessage);
//     this._state.dialogsPage.newMessageText = "";
//     this._callSubscribe();
// },
// updateNewPostText(newText: string) {
//     this._state.profilePage.newPostText = newText;
//     this._callSubscribe();
// },
// updateNewMessageText(newMessage: string) {
//     this._state.dialogsPage.newMessageText = newMessage;
//     this._callSubscribe();
// },