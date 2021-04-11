import React from "react";
import {LoginFormType, LoginReduxForm} from "./LoginForm";


const Login = (props: any) => {

    const onSubmit = (formData: LoginFormType) => {
        console.log(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default Login;