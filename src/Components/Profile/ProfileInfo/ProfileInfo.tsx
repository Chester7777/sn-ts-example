import React from "react";
import s from "./ProfileInfo.module.css"
import MyPostsContainer from "../MyPosts/MyPostsContainer";



const ProfileInfo = () => {
    return (
        <div>
            <div className={s.image}>
                <img
                    src="https://cdn.pixabay.com/photo/2016/10/21/09/29/earth-1757617__480.jpg"
                    className={s.image_backgraund}/>
            </div>
            <div className={s.description}>
               <span>ava + description</span>
            </div>
        </div>
    )
}

export default ProfileInfo;