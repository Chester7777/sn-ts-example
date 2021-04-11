import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";

export type LoginFormType = {
    login: string
    password: number
    rememberMe: boolean
}
export const LoginForm = (props: InjectedFormProps<LoginFormType>) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={"input"} name={"login"} placeholder={"Login"}/>
            </div>
            <div>
                <Field component={"input"} name={"password"} placeholder={"Password"}/>

            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me

            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
export const LoginReduxForm = reduxForm<LoginFormType>({form: "login"})(LoginForm)
