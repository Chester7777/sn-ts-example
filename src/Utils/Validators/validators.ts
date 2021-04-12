import {MyPostsType} from "../../Components/Profile/MyPosts/Post/AddMyPostForm";


export const required = (value: MyPostsType) => {
    if(value) return undefined;
    return "Field is required";
}
export const maxLengthCreator = (maxLength: number) =>  (value: any) => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}