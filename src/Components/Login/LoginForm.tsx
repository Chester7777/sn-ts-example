import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/validators";
import s from "./../Common/FormsControls/FormControls.module.css"

export type LoginFormType = {
    email: string
    password: number
    rememberMe: boolean
}
export const LoginForm = (props: InjectedFormProps<LoginFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} validate={[required]} name={"email"} placeholder={"Email"}/>
            </div>
            <div>
                <Field component={Input} validate={[required]} name={"password"} type={"password"}
                       placeholder={"Password"}/>

            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/> remember me

            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
export const LoginReduxForm = reduxForm<LoginFormType>({form: "login"})(LoginForm)
