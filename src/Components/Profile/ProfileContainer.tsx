import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {GetTasksResponseType} from "../Users/UsersContainer";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profilePage-reducer";
import {withRouter} from "react-router-dom"


export class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = 2;
        }
        axios.get<GetTasksResponseType>("https://social-network.samuraijs.com/api/1.0/profile/" + userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state: any) => ({})

//передает компаненте данные из URL

let WithUrlDataContainerComponent = withRouter(ProfileContainer);


//передает в компаненту данные из store
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);