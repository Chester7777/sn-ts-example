import s from "../Dialog.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";

export type AddMassageFormType = {
    newMessageText: string
}
const AddMassageForm = (props: InjectedFormProps<AddMassageFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.addText}>
                <Field component="textarea" name="newMessageText" placeholder="Enter your message"/>
            </div>

            <div className={s.addTextButton}>
                <button>send</button>
            </div>

        </form>
    )
}
export const AddMessageFormRedux = reduxForm<AddMassageFormType>({form: "DialogAddMassageForm"})(AddMassageForm)
