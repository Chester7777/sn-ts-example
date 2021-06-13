import usersReducer, {followSuccess, InitialStateType, unfollowSuccess} from "./users-reducer";



let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                name: "Dima", id: 1, uniqueUrlName: "dima", photos: {small: null, large: null},
                status: "status 1", followed: false
            },
            {
                name: "Andrey", id: 2, uniqueUrlName: "dima", photos: {small: null, large: null},
                status: "status 2", followed: false
            },
            {
                name: "Masha", id: 3, uniqueUrlName: "dima", photos: {small: null, large: null},
                status: "status 3", followed: true
            },
            {
                name: "Inna", id: 4, uniqueUrlName: "dima", photos: {small: null, large: null},
                status: "status 4", followed: true
            },

        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        portionSize: 10
    }
})

test("follow success", () => {

    let newState = usersReducer(state, followSuccess(1))

expect(newState.users[0].followed).toBeTruthy();
expect(newState.users[1].followed).toBeFalsy();
})
test("unfollow success", () => {

    let newState = usersReducer(state, unfollowSuccess(1))

expect(newState.users[2].followed).toBeTruthy();
expect(newState.users[1].followed).toBeFalsy();
})

