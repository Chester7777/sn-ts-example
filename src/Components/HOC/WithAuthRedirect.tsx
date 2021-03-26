import React from "react";
import {Redirect} from "react-router-dom";
import {AllAppStateType} from "../../redux/Redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: AllAppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})
export function withAuthRedirect  <T>(Component: React.ComponentType<T>) {
    class RedirectComponent extends React.Component<MapStateToPropsType> {
        render() {
            let {isAuth, ...restProps} = this.props
            if(!isAuth) return <Redirect to="/login"/>
            return <Component {...restProps as T} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)

    return ConnectedAuthRedirectComponent
}