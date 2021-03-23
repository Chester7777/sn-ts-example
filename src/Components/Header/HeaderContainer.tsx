import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {AllAppStateType} from "../../redux/Redux-store";
import Header from "./Header";
import {setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../API/API";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => void
}


export type PropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType

type DataPropsType = {
    id: number
    email: string
    login: string
}
type PostPropsType = {
    data: DataPropsType
    resultCode: number
    messages: Array<string>
}

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {

        usersAPI.getAuth().then(data => {
            if(data.resultCode === 0) {
                let {userId, email, login, isAuth} = data.data
                this.props.setAuthUserData(userId, email, login, isAuth)
            }
        })
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
            </div>
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
export default connect<any,any,any,any>(mapStateToProps, {setAuthUserData})(WithUrlDataContainerComponent);