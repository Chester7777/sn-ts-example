import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";


type PropsType = {
    addPosts: () => void
    onPostChangeActionCreator: (text: string) => void
    posts: Array<PostsType>
    newPostText: string
}


const MyPosts: React.FC<PropsType> = (props) => {

    const postsElement = props.posts.map((p) => <Post id={p.id} message={p.message}
                                                      likes={p.likes}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        props.addPosts()
    }

    let onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value;
            props.onPostChangeActionCreator(text)
        }
    }


    return (
        <div className={s.post}>
            <div className={s.myPosts}>
                {/*<h3>My posts</h3>*/}
            </div>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div className={s.button}>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            {postsElement}
        </div>
    )
}

export default MyPosts;