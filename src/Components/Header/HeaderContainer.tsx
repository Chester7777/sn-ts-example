import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void
}
export type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<PropsType> {
    //перенесли в APP
    // componentDidMount() {
    //     this.props.getAuthUserData()
    // }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

//передает компаненте данные из URL
let WithUrlDataContainerComponent = withRouter(HeaderContainer);


//передает в компаненту данные из store
export default connect<MapStatePropsType, MapDispatchPropsType, any, any>(mapStateToProps, {logout})(WithUrlDataContainerComponent);