type MassagesType = {
    id: number,
    massage: string
}
type DialogsType = {
    id: number,
    name: string
}
type DialogsPageType = {
    dialogs: Array<DialogsType>
    massages: Array<MassagesType>

}
type PostsType = {
    id: number,
    massage: string,
    likesCount: number
}
type ProfilePageType = {
    posts: Array<PostsType>
}
type SideBarType = {}
type RootStateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType,
    sideBar: SideBarType
}


let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, massage: "Hi, how are yue?", likesCount: 12},
            {id: 2, massage: "It`s my first post?", likesCount: 11},
            {id: 3, massage: "Blabla", likesCount: 11},
            {id: 4, massage: "Data", likesCount: 11}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Andrew"},
            {id: 3, name: "Sveta"},
            {id: 4, name: "Sasha"},
            {id: 5, name: "Victor"},
            {id: 6, name: "Valera"}
        ],
        massages: [
            {id: 1, massage: "Hi"},
            {id: 2, massage: "How is your it-kamasutra?"},
            {id: 3, massage: "Yo"},
            {id: 4, massage: "Yo"},
            {id: 5, massage: "Yo"}
        ]
    },
    sideBar: {}

}

export default state