import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfilePropsType} from "../../redux/profilePage-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePropsType
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
}
type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType
// React.ComponentClass<Pick<PropsType, "profile" | "getUserProfile">, any> & WithRouterStatics<typeof ProfileContainer>


class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfile(+userId)
    }

    render() {
        if(!this.props.isAuth) return <Redirect to="/login" />
        return (
            <div>
                <Profile {...this.props} />
            </div>
        )
    }
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

//передает компаненте данные из URL

let WithUrlDataContainerComponent = withRouter(ProfileContainer);


//передает в компаненту данные из store
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);