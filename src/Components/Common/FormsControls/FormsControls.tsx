import React from "react";
import s from "./FormControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    input: any
}

export const FormControl: React.FC<FormControlPropsType> = ({input, meta, children, ...props}) => {
    const hasError = meta.touched && meta.error;

    return <div className={s.formControl + " " + (hasError ? s.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>

}

export const createField = (placeholder: string,
                            name: string,
                            validators: any,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = "") => {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}