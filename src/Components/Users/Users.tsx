import React, {FC, useEffect} from "react";
import s from "./Users.module.css";
import {FilterType, follow, requestUsersThunkCreator, unfollow, UsersType} from "../../redux/users-reducer";
import userPhoto from "../../asseds/images/user.png";
import {NavLink, useHistory} from "react-router-dom"
import {Paginator} from "../Common/Paginator/Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import * as queryString from "querystring";


type PropsType = {}
type PostPropsType = {
    id: number
    resultCode: number
}


export const Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const portionSize = useSelector(getPortionSize);

    const dispatch = useDispatch();
    const history = useHistory();

    //синхронизация URL адреса
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string, friend: string};

        let actualPage = currentPage;
        let actualFilter = filter;

        if(!!parsed.page) actualPage = Number(parsed.page);
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }


        dispatch(requestUsersThunkCreator(actualPage, pageSize, actualFilter));
    }, []);

    //синхронизация URL адреса
    useEffect(() => {
        history.push({
            pathname: `/users`,
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage]);



    //подключаем thunkCreator (санки)
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsersThunkCreator(pageNumber, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsersThunkCreator(1, pageSize, filter));
    };
    const followed = (userId: number) => {
        dispatch(follow(userId))
    };
    const unfollowed = (userId: number) => {
        dispatch(unfollow(userId))
    };


    let pageCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    };

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   portionSize={portionSize}/>
        {/*<div>*/}
        {/*    {pages.map(p => {*/}
        {/*        return <span*/}
        {/*            key={p}*/}
        {/*            className={props.currentPage === p ? s.selectedPage : ""}*/}
        {/*            onClick={(e) => props.onPageChanged(p)}*/}
        {/*        >{p}</span>*/}
        {/*    })}*/}
        {/*</div>*/}
        {/*использовал до componentDidMount*/}
        {/*<button onClick={this.props.getUsers}>get users</button>*/}
        {
            users.map((u: UsersType) => {
                    return <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"./profile/" + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ?
                                <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    unfollowed(u.id)
                                }}>unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    followed(u.id)
                                }}>follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>
                                {u.name}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {"u.location.country"}
                            </div>
                            <div>
                                {"u.location.citi"}
                            </div>
                        </span>
                    </span>
                    </div>
                }
            )
        }
    </div>
}

