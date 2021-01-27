import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType, updateNewPostText} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
    addPost: () => void
    updateNewPostText: (newText: string) => void
    newPostText: string

}

const MyPosts: React.FC<MyPostsType> = (props) => {

    const postsElement = props.posts.map((p: any) => <Post id={p.id} message={p.message} likes={p.likes}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPosts = () => {
        props.addPost();
    }

    let onPostChange = () => {
        if (newPostElement.current) {
            props.updateNewPostText(newPostElement.current.value);
        }
    }

    return (
        <div className={s.post}>
            <div className={s.myPosts}>
                <h3>My posts</h3>
            </div>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div className={s.button}>
                    <button onClick={addPosts}>Add post</button>
                </div>
            </div>
            {postsElement}
        </div>
    )
}

export default MyPosts;