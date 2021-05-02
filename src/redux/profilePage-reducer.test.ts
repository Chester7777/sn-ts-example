import profilePageReducer, {
    addPostsActionCreator,
    deletePostsActionCreator,
    PostsType,
    ProfilePropsType
} from "./profilePage-reducer";


let state = {
    posts: [
        {id: 1, message: "Hey, why nobody love me", likes: "15"},
        {id: 2, message: "It`s our new program! Hey", likes: "20"},
    ] as Array<PostsType>,
    profile: {} as ProfilePropsType,
    status: ""
};

test("reducer should add message new string", () => {
    //test data
    let action = addPostsActionCreator("Yo-YO-YO")

    //action
    let newState = profilePageReducer(state, action);

    //expectation
    expect(newState.posts[2].message).toBe("Yo-YO-YO")
});

test("reducer should add posts", () => {
    //test data
    let action = addPostsActionCreator("Yo-YO-YO")

    //action
    let newState = profilePageReducer(state, action);

    //expectation
    expect(newState.posts.length).toBe(3);
});

test("after deleting length should be decrement", () => {
    //test data
    let action = deletePostsActionCreator(1)

    //action
    let newState = profilePageReducer(state, action);

    //expectation
    expect(newState.posts.length).toBe(1);
});

test("after deleting length should`nt be changed if id incorrect", () => {
    //test data
    let action = deletePostsActionCreator(1000)

    //action
    let newState = profilePageReducer(state, action);

    //expectation
    expect(newState.posts.length).toBe(2);
});