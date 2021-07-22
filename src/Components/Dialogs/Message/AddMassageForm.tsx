import s from "../Dialog.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../../Utils/Validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

export type AddMassageFormType = {
    newMessageText: string
}

const maxLength50 = maxLengthCreator(50);

const AddMassageForm: React.FC<InjectedFormProps<AddMassageFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.addText}>
                <Field
                    component={Textarea}
                    name="newMessageText"
                    placeholder="Enter your message"
                    validate={[required, maxLength50]}
                />
            </div>
            <div className={s.addTextButton}>
                <button>send</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<AddMassageFormType>({form: "DialogAddMassageForm"})(AddMassageForm)
