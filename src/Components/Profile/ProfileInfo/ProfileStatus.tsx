import React, {useEffect, useState} from "react";

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        if (status !== props.status) {
            setStatus(props.status)
        }
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    };
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    };
    const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    };

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "--------"}</span>
            </div>}
            {editMode &&
            <div>
                <input
                    onChange={changeStatus}
                    autoFocus={true}
                    onBlur={deActivateEditMode}
                    type="text"
                    value={status}/>
            </div>}
        </div>
    )
}

export default ProfileStatus;


//таже компонента, но классовая
// class ProfileStatus extends React.Component<ProfileStatusPropsType> {
//     state = {
//         aditMode: false,
//         status: this.props.status
//     }
//     activateEditMode = () => {
//         this.setState({
//             aditMode: true
//         })
//     }
//     deActivateEditMode = () => {
//         this.setState({
//             aditMode: false
//         })
//         this.props.updateStatus(this.state.status)
//     }
//     changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({
//             status: e.currentTarget.value
//         })
//     }
//
//     componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
//         if (prevProps.status !== this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 {!this.state.aditMode &&
//                 <div>
//                     <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
//                 </div>}
//                 {this.state.aditMode &&
//                 <div>
//                     <input
//                         onChange={this.changeStatus}
//                         autoFocus={true}
//                         onBlur={this.deActivateEditMode}
//                         type="text"
//                         value={this.props.status || "--------"}/>
//                 </div>}
//             </div>
//         )
//     }
//
// }
// export default ProfileStatus;