import React from "react";
import {FriendsType} from "../../redux/store";


type PropsType = {
    friends: Array<FriendsType>
}


const Friend: React.FC<PropsType> = (props) => {

    return(
        <div>
            {props.friends[0].name}
        </div>
    )
}

export default Friend;