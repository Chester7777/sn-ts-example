import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import {ProfilePropsType} from "../../../redux/profilePage-reducer";

type ProfileInfoPropsType = {
    profile: ProfilePropsType
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.image}>
                <img
                    src="https://cdn.pixabay.com/photo/2016/10/21/09/29/earth-1757617__480.jpg"
                    className={s.image_backgraund}/>
            </div>
            <div className={s.description}>
                <img src={props.profile.photos.large}/>
                <span>ava + description</span>
            </div>
        </div>
    )
}

export default ProfileInfo;