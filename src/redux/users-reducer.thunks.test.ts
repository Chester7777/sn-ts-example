import {follow, setIsFollowingProgress, unfollow} from "./users-reducer";
import {usersAPI} from "../API/UsersAPI";
import {PostPropsType} from "./auth-reducer";
import {ResultCodesEnum} from "../API/API";

jest.mock("../API/UsersAPI");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: PostPropsType = {
    id: null,
    email: null,
    login: null,
    // data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
//@ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result));
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

// test("success follow thunk", async () => {
//     const thunk = follow(1);
//
//
//     await thunk(dispatchMock, getStateMock, {});
//
//     expect(dispatchMock).toBeCalledTimes(1);
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFollowingProgress(true, 1));
// })
// test("success unfollow thunk", async () => {
//     const thunk = unfollow(1);
//
//
//     await thunk(dispatchMock, getStateMock, {});
//
//     expect(dispatchMock).toBeCalledTimes(3);
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFollowingProgress(true, 1));
// })