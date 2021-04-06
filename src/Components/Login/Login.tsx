import React from "react";


export const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={"input"} name={"login"} placeholder={"Login"}/>
            </div>
            <div>
                <Field component={"input"} name={"password"} placeholder={"Password"}/>

            </div>
            <div>
                <Field component={"input"} name={"remember"} type={"checkbox"}/> remember me

            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm ({form: "login"})(LoginForm)


const Login = (props: any) => {

    const onSubmit = (formData: any) => {
        props.formData
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default Login;