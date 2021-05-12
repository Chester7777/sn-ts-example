import {AllAppStateType} from "./Redux-store";

export const getUsers = (state: AllAppStateType) => {
    return state.usersPage.users;
}
export const getPageSize = (state: AllAppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AllAppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AllAppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AllAppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AllAppStateType) => {
    return state.usersPage.followingInProgress;
}
export const getPortionSize = (state: AllAppStateType) => {
    return state.usersPage.portionSize;
}