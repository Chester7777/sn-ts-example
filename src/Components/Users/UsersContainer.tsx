import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {AllAppStateType} from "../../redux/Redux-store";
import {Dispatch} from "redux";
import {followAC, setUserAC, unfollowAC, UsersType} from "../../redux/users-reducer";

let mapStateToProps = (state: AllAppStateType) => {

    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUserAC(users))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);