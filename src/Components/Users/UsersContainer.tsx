import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC, setFetchingAC, setIsFetchingAC,
    setUserAC,
    setUsersTotalCountAC,
    unfollowAC,
    UsersType
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import preloader from "../../asseds/images/Pinwheel.gif"
import Preloader from "../Common/Preloader/Preloader";


type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    setFetching: (isFetching: boolean) => void
}
export type UsersPropsType = MapStateToPropsType & mapDispatchToPropsType;

type GetTasksResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type OnPageChangedType = {
    onPageChanged: (pageNumber: number) => void
}


export class UsersContainer extends React.Component<UsersPropsType & OnPageChangedType> {

    componentDidMount() {
        this.props.setFetching(true)
        axios.get<GetTasksResponseType>("https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}").then(response => {
            this.props.setFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setFetching(true)
        this.props.setCurrentPage(pageNumber);
        axios.get<GetTasksResponseType>("https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}").then(response => {
            this.props.setFetching(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() {

        return <>
            {this.props.isFetching ?  <Preloader /> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
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
        isFetching: state.usersPage.isFetching
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
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        setFetching: (isFetching: boolean) => {
            dispatch(setIsFetchingAC(isFetching))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);