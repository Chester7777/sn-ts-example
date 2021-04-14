import React from "react";
import {LoginFormType, LoginReduxForm} from "./LoginForm";
import {connect, useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: number, rememberMe: boolean) => void
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    //isAuth можно и так достать
    // const isAuth = useSelector<AllAppStateType, boolean>(state => state.auth.isAuth)

    const onSubmit = (formData: LoginFormType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login);