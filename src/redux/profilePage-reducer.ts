import {ActionType} from "./store";



const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type PostsType = {
    id: number
    message: string
    likes: string
}
export type InitialStateType = typeof initialState
// обьект initialState задает начальное значение state, если он не придет сразу
let initialState = {
    posts: [
        {id: 1, message: "Hey, why nobody love me", likes: "15"},
        {id: 2, message: "It`s our new program! Hey", likes: "20"},
    ] as Array<PostsType>,
    newPostText: ""
}

// обьект initialState задает начальное значение state, если он не придет сразу
const profilePageReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 3,
                message: state.newPostText,
                likes: "0"
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return state;
    }

}
export const addPostsActionCreator = () => ({type: ADD_POST} as const)
export const onPostChangeActionCreator = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)


export default profilePageReducer;