import React from "react";
import {addPostsActionCreator} from "../../../redux/profilePage-reducer";
import MyPosts from "./MyPosts"
import {connect} from "react-redux";
import {AllAppStateType} from "../../../redux/Redux-store";
import {Dispatch} from "redux";
import {PostsType} from "../../../redux/store";

//самодельный контейнер
// type MyPostsType = {
//     store: StoreType
// }
// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState()
//                 let addPosts = () => {
//                     store.dispatch(addPostsActionCreator());
//                 }
//                 let onPostChange = (text: string) => {
//                     let action = onPostChangeActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 return (
//                     <MyPosts
//                         onPostChangeActionCreator={onPostChange}
//                         addPosts={addPosts}
//                         posts={state.profilePage.posts}
//                         newPostText={state.profilePage.newPostText}
//                     />
//                 )
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }


type MapStateToPropsType = {
    // newPostText: string
    posts: Array<PostsType>
}
type mapDispatchToPropsType = {
    addPosts: (newPostText: string) => void

}
export type MyPostsPropsType = MapStateToPropsType & mapDispatchToPropsType

// подключили react-redux
let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        // newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPosts: (newPostText: string) => dispatch(addPostsActionCreator(newPostText))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
//
// export default MyPostsContainer;