import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css"
import {ProfilePropsType} from "../../../redux/profilePage-reducer";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../asseds/images/user.png"
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (filePhoto: any) => void
    lookingForAJob: boolean
    saveProfile: (formData: any) => Promise<void>
    goToEditMode: () => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }
    return (
        <div>
            <div className={s.image}>
                <img
                    src="https://cdn.pixabay.com/photo/2016/10/21/09/29/earth-1757617__480.jpg"
                    className={s.image_backgraund}/>
            </div>
            <div className={s.description}>
                <img className={s.mainPhoto} src={props.profile.photos?.large || userPhoto}/>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => setEditMode(true)} profile={props.profile}
                                   isOwner={props.isOwner}/>}
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

type ProfileDataType = {
    profile: any, isOwner: boolean, goToEditMode: () => void
}

const ProfileData = ({profile, goToEditMode, isOwner}: ProfileDataType) => {

    return (
        <div>
            {isOwner &&
            <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription ? "yes" : "no"}
            </div>}
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {profile.contacts &&
            Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}

            </div>
        </div>
    )
}


type ContactType = {
    contactTitle: string
    contactValue: string | null
}
export const Contact = ({contactTitle, contactValue}: ContactType) => {

    return <div className={s.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;