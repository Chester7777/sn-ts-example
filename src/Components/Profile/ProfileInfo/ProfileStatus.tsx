import React from "react";
import s from "./ProfileInfo.module.css"

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void

}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        aditMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            aditMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            aditMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.aditMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>}

                {this.state.aditMode &&
                    <div>
                    <input
                        onChange={this.changeStatus}
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        type="text"
                        value={this.props.status || "--------"}/>
                </div>}
            </div>
        )
    }

}


export default ProfileStatus;