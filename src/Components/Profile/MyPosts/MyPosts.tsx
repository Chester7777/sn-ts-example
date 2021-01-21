import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

type MyPostsPropsType = {
    postsData: PostsDataPropsType
}
type PostsDataPropsType = {
    id: number
    message: string
    likes: string
}

let postsData = [
    {id: 1, message: "Hey, why nobody love me", likes: "15"},
    {id: 2, message: "It`s our new program! Hey", likes: "20"}
]

const MyPosts = (props: MyPostsPropsType) => {
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
            <Post id={postsData[0].id} message={postsData[0].message} likes={postsData[0].likes}/>
            <Post id={postsData[1].id} message={postsData[1].message} likes={postsData[1].likes}/>

        </div>
    )
}

export default MyPosts;