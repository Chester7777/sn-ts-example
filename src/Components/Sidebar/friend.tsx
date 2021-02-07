import React from "react";
import {FriendsType, RootStateType} from "../../redux/state";


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