import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../redux/state";

type MyPostsType = {
    posts: Array<PostsType>
}

const MyPosts: React.FC<MyPostsType> = (props) => {

    const postsElement = props.posts.map((p: any) => <Post id={p.id} message={p.message} likes={p.likes}/>)

    return (
        <div className={s.post}>
            <div className={s.myPosts}>
                <h3>My posts</h3>
            </div>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div className={s.button}>
                    <button>Add post</button>
                </div>
            </div>
            {postsElement}
        </div>
    )
}

export default MyPosts;