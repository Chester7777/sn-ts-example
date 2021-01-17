import React from "react";
import s from "./Post.module.css"

type PostPropsType = {
    message: string
    likes: string
}

const  Post = (props: PostPropsType) => {
    return (

            <div className={s.item}>
                <img src="https://i.ytimg.com/vi/Y5GLCBjHR8U/maxresdefault.jpg" alt=""/>
                {props.message}

                <div>
                    <span>
                        likes
                    </span>
                    {props.likes}
                </div>
            </div>
    )
}

export default Post;