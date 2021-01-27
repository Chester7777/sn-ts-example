import React from "react";
import s from "./ProfileInfo.module.css"



const ProfileInfo = () => {
    return (
        <div>
            <div className={s.image}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzr0R9ziCVWDGq7tD8jO-FhKrY_KxfqpxW1g&usqp=CAU"
                    alt="content"/>
            </div>
            <div className={s.description}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;