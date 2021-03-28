import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";
import Header from "./Header";
import {getAuthUserData} from "../../redux/auth-reducer";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    getAuthUserData: () => void
}


export type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType

type DataPropsType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}
type PostPropsType = {
    data: DataPropsType
    resultCode: number
    messages: Array<string>
}

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

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
export default connect<any,any,any,any>(mapStateToProps, {getAuthUserData})(WithUrlDataContainerComponent);