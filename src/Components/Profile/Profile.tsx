import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfilePropsType} from "../../redux/profilePage-reducer";


type PropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (filePhoto: string) => void
    lookingForAJob: boolean
    saveProfile: (formData: any) => void

}

const Profile = (props: PropsType) => {

    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                lookingForAJob={props.profile.lookingForAJob}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;