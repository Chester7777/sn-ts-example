import {connect} from "react-redux";
import Users from "./Users";
import {AllAppStateType} from "../../redux/Redux-store";
import {Dispatch} from "redux";
import {followAC, setUserAC, unfollowAC, UsersType} from "../../redux/users-reducer";


type MapStateToPropsType = {
    users: Array<UsersType>
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}


export type UsersPropsType = MapStateToPropsType & mapDispatchToPropsType;

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {

    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUserAC(users))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);