import {Field, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import React from "react";


export const AddMyPostForm = (props: any) => {
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

export const AddMyPostFormRedux = reduxForm({form: "ProfileFddPosts"})(AddMyPostForm)
