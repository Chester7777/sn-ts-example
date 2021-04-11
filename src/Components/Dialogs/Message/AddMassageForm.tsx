import s from "../Dialog.module.css";
import {Field, reduxForm} from "redux-form";
import React from "react";


const AddMassageForm = (props: any) => {
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
export const AddMessageFormRedux = reduxForm({form: "DialogAddMassageForm"})(AddMassageForm)
