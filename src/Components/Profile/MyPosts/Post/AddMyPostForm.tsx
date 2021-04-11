import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import React from "react";

export type  MyPostsType = {
    newPostText: string
}
export const AddMyPostForm = (props: InjectedFormProps<MyPostsType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newPostText" placeholder="Add post"/>
            </div>
            <div className={s.button}>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddMyPostFormRedux = reduxForm<MyPostsType>({form: "ProfileFddPosts"})(AddMyPostForm)
