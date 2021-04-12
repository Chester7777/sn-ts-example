import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import React from "react";
import {required, maxLengthCreator} from "../../../../Utils/Validators/validators";
import {Textarea} from "../../../Common/FormsControls/FormsControls";

export type  MyPostsType = {
    newPostText: string
}
const maxLength10 = maxLengthCreator(30);
export const AddMyPostForm = (props: InjectedFormProps<MyPostsType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name="newPostText"
                    placeholder={"Post message"}
                validate={[required, maxLength10]}
                />
            </div>
            <div className={s.button}>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddMyPostFormRedux = reduxForm<MyPostsType>({form: "ProfileFddPosts"})(AddMyPostForm)
