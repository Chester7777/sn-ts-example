import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfilePropsType, updateStatus} from "../../redux/profilePage-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePropsType
    status: string
    authorizedUserId: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType

// React.ComponentClass<Pick<PropsType, "profile" | "getUserProfile">, any> & WithRouterStatics<typeof ProfileContainer>


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId  = this.props.match.params.userId

        if (!userId) {
            userId = this.props.authorizedUserId;
if(!userId) {
    this.props.history.push("/login")
}
        }
        this.props.getUserProfile(+userId);
        this.props.getStatus(+userId);
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

//обертка compose
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);

//HOC создает контейненрную компаненту вокруг ProfileContainer
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

//передает компаненте данные из URL
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

//передает в компаненту данные из store
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);