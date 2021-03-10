import React from "react";
import s from "./ProfileInfo.module.css"
import MyPostsContainer from "../MyPosts/MyPostsContainer";



const ProfileInfo = () => {
    return (
        <div>
            <div className={s.image}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzr0R9ziCVWDGq7tD8jO-FhKrY_KxfqpxW1g&usqp=CAU"
                    className={s.image_backgraund}/>
            </div>
            <div className={s.description}>
               <span>ava + description</span>
            </div>
        </div>
    )
}

export default ProfileInfo;