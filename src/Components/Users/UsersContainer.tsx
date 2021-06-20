import {useSelector} from "react-redux";
import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";



type UsersPageType = {
    pageTitle: string
}

//после рефакторинга
export const UsersPage: React.FC<UsersPageType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        {/*<Paginator />*/}
        <Users/>
    </>
}


//тоже на классовой компаненте
// class UsersContainer extends React.Component<UsersPropsType> {

//подключаем thunkCreator (санки)
// componentDidMount() {
//     const {currentPage, pageSize, filter} = this.props;
//     this.props.getUsers(currentPage, pageSize, filter);
// }

// componentDidMount() {
//     this.props.setIsFetching(true)
//     usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
//         this.props.setIsFetching(false)
//         this.props.setUsers(data.items)
//         this.props.setTotalUsersCount(data.totalCount)
//     })
// }

// //подключаем thunkCreator (санки)
// onPageChanged = (pageNumber: number) => {
//     const {pageSize, filter} = this.props;
//     this.props.getUsers(pageNumber, pageSize, filter)
// }
// onPageChanged = (pageNumber: number) => {
//     this.props.setCurrentPage(pageNumber);
//     this.props.setIsFetching(true)
//     usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
//         this.props.setIsFetching(false)
//         this.props.setUsers(data.items)
//     })
// }

// onFilterChanged = (filter: FilterType) => {
//     const {pageSize} = this.props;
//     this.props.getUsers(1, pageSize, filter)
// }

// render() {
// return <>
//     {this.props.isFetching ? <Preloader/> : null}
//     {/*<Paginator />*/}
//     <Users
//         // totalItemsCount={this.props.totalUsersCount}
//         // pageSize={this.props.pageSize}
//         // currentPage={this.props.currentPage}
//         onPageChanged={this.onPageChanged}
//         onFilterChanged={this.onFilterChanged}
//         users={this.props.users}
//         follow={this.props.follow}
//         unfollow={this.props.unfollow}
//         followingInProgress={this.props.followingInProgress}
//         portionSize={this.props.portionSize}
//         // setIsFollowingProgress={this.props.setIsFollowingProgress}
//     />
// </>
// }
// }

//refactoring
// let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
// let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         portionSize: getPortionSize(state),
//         filter: getUsersFilter(state)
//     }
// }

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

// export default compose<React.ComponentType>(
//     connect(mapStateToProps, {
//         follow,
//         unfollow,
//         setCurrentPage,
//         setIsFollowingProgress,
//         getUsers: requestUsersThunkCreator
//     })
// )(UsersContainer);
// let withRedirectComponent = withAuthRedirect(UsersContainer)
//
// export default connect(mapStateToProps,
//     {
//         follow,
//         unfollow,
//         // setUsers,
//         setCurrentPage,
//         // setTotalUsersCount,
//         // setIsFetching,
//         setIsFollowingProgress,
//         getUsers: getUsersThunkCreator
//     })(withRedirectComponent);