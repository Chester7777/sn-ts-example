import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfilePropsType} from "../../redux/profilePage-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";
import {withAuthRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePropsType
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
        return (
            <div>
                <Profile {...this.props} />
            </div>
        )
    }
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

//обертка compose
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);

//HOC создает контейненрную компаненту вокруг ProfileContainer
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

//передает компаненте данные из URL
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

//передает в компаненту данные из store
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);