import React from "react";
import {createField, Input} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfilePropsType} from "../../../redux/profilePage-reducer";
import s from "../../Common/FormsControls/FormControls.module.css";


type ProfileDataFormType = {
    profile: ProfilePropsType
    error: string
}

const ProfileDataForm = (props: InjectedFormProps<ProfileDataFormType>) => {

    return (
        <form  onSubmit={props.handleSubmit}>
            <button>save</button>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}

            <div>
                <b>Full name:</b> {createField("Full name", "FullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>

            <div>
                <b>My professional skills:</b> {createField("My professional skills", "lookingForAJobDescription", [], Input)}
            </div>
            <div>
                <b>About me:</b> {createField("About me", "aboutMe", [], Input)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map((key) => {
                return <div key={key}><b>{key}: {createField(key, "contacts." + key, [], Input)}</b> </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);
 export default ProfileDataFormReduxForm;