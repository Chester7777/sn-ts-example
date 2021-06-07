import {PhotosType, ProfilePropsType} from "../redux/profilePage-reducer";
import {APIResponseType, instance, LoginAuthResponseType} from "./API";

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfilePropsType>(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<StatusProfileType>(`profile/status`, {status: status})
    },
    savePhoto(filePhoto: string) {
        const formData = new FormData();
        formData.append("image", filePhoto)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    saveProfile(profile: ProfilePropsType) {
        return instance.put<LoginAuthResponseType>(`profile`, profile)
    }
}

export type SavePhotoResponseDataType = {
    photos: PhotosType
};

export type StatusProfileType = {
    resultCode: number,
    message: string,
    data: {
        resultCode: number
        messages: string[],
        data: {}
    }
};

