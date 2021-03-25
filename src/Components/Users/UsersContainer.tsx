import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";
import {
    follow,
    getUsersThunkCreator,
    setCurrentPage,
    setIsFetching,
    setIsFollowingProgress,
    setTotalUsersCount,
    setUsers,
    unfollow,
    UsersType
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../API/API";


type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setIsFetching: (isFetching: boolean) => void
    setIsFollowingProgress: (isFetching: boolean, userId: number) => void

}
export type UsersPropsType = MapStateToPropsType & mapDispatchToPropsType;

export type GetTasksResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
// export type OnPageChangedType = {
//     onPageChanged: (pageNumber: number) => void
// }


class UsersContainer extends React.Component<UsersPropsType> {

    //подключаем thunkCreator (санки)
componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
}
    // componentDidMount() {
    //     this.props.setIsFetching(true)
    //     usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //         this.props.setIsFetching(false)
    //         this.props.setUsers(data.items)
    //         this.props.setTotalUsersCount(data.totalCount)
    //     })
    // }

    //подключаем thunkCreator (санки)
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }
    // onPageChanged = (pageNumber: number) => {
    //     this.props.setCurrentPage(pageNumber);
    //     this.props.setIsFetching(true)
    //     usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
    //         this.props.setIsFetching(false)
    //         this.props.setUsers(data.items)
    //     })
    // }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                // followingInProgress={this.props.followingInProgress}
                setIsFollowingProgress={this.props.setIsFollowingProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
//
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: Array<UsersType>) => {
//             dispatch(setUserAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         setIsFetching: (isFetching: boolean) => {
//             dispatch(setIsFetchingAC(isFetching))
//         }
//     }
// }


export default connect(mapStateToProps,
    {
        follow,
        unfollow,
        // setUsers,
        setCurrentPage,
        // setTotalUsersCount,
        // setIsFetching,
        setIsFollowingProgress,
        getUsers: getUsersThunkCreator
    })(UsersContainer);