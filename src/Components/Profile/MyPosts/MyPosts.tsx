import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

type PostPropsType = {}


const MyPosts = (props: PostPropsType) => {
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
            <Post message="Hey, why nobody love me" likes="15"/>
            <Post message="It`s our new program! Hey" likes="20"/>

        </div>
    )
}

export default MyPosts;