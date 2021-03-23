import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfilePropsType, setUserProfile} from "../../redux/profilePage-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {UsersType} from "../../redux/users-reducer";
import {AllAppStateType} from "../../redux/Redux-store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePropsType
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfilePropsType) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2";
        }
        axios.get<ProfilePropsType>("https://social-network.samuraijs.com/api/1.0/profile/" + userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} />
            </div>
        )
    }
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})

//передает компаненте данные из URL

let WithUrlDataContainerComponent = withRouter(ProfileContainer);


//передает в компаненту данные из store
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);