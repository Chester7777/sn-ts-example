import {instance} from "./API";

export const securityAPI = {
    security() {
        return instance.get<{ url: string }>("security/get-captcha-url")
    }
}