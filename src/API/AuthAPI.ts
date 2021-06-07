import {instance, LoginAuthResponseType, LoginResponseType, MeResponseType} from "./API";

export const AuthAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`);
    },
    login(email: string, password: number, rememberMe: boolean, captcha?: string | null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    loginAuth() {
        return instance.delete<LoginAuthResponseType>(`auth/login`)
    }
}