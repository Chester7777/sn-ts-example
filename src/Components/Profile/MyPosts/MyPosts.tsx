import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddMyPostFormRedux, MyPostsType} from "./Post/AddMyPostForm";


const MyPosts = (props: MyPostsPropsType) => {

    const postsElement = props.posts.map((p) => <Post id={p.id} message={p.message}
                                                      likes={p.likes}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = (values: MyPostsType) => {
        props.addPosts(values.newPostText)
    }
    //до подключения Form
    // let onPostChange = () => {
    //     if (newPostElement.current) {
    //         let text = newPostElement.current.value;
    //         props.onPostChangeActionCreator(text)
    //     }
    // }
    return (
        <div className={s.post}>
            <h3>My posts</h3>
            <AddMyPostFormRedux onSubmit={onAddPost} />
            <div className={s.myPosts}>
                {postsElement}
            </div>
        </div>
    )
}

export default MyPosts;