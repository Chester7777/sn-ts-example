import React from "react";
import s from "./ProfileInfo.module.css"

export type ProfileStatusPropsType = {
    status: any
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        aditMode: false
    }
    activateEditMode () {
        this.setState({
            aditMode: true
        })
    }
    deActivateEditMode () {
        this.setState({
            aditMode: false
        })
    }

    render() {

        return (
            <div>
                {!this.state.aditMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>}

                {this.state.aditMode &&
                    <div>
                    <input autoFocus={true} onBlur={this.deActivateEditMode.bind(this)} type="text" value={this.props.status}/>
                </div>}
            </div>
        )
    }

}

export default ProfileStatus;