import React from "react";
import {createField, Input} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from "../../Common/FormsControls/FormControls.module.css";
import {ProfilePropsType} from "../../../redux/profilePage-reducer";


// type ProfileDataFormType = {
//     profile: ProfilePropsType
//     error: string
// }


const ProfileDataForm = (props: any) => {

    return (
        <form  onSubmit={props.handleSubmit}>
            <button>save</button>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}

            <div>
                <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
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

const ProfileDataFormReduxForm = reduxForm<any,any>({form: "edit-profile"})(ProfileDataForm);
 export default ProfileDataFormReduxForm;