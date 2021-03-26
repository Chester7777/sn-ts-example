import React from "react";
import {addMessagesActionCreator, DialogsPageType, onMessageChangeActionCreator} from "../../redux/dialogsPage-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../HOC/WithAuthRedirect";

//самодельный контейнер
// type PropsType = {
//     store: StoreType
// }
// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState().dialogsPage
//                     let addMessages = () => {
//                         store.dispatch(addMessagesActionCreator());
//                     }
//                     let onMessageChange = (body: string) => {
//                         store.dispatch(onMessageChangeActionCreator(body));
//                     }
//                     return (
//                         <Dialogs addMessages={addMessages} onMessageChange={onMessageChange} dialogsPage={state}/>
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//
//     )
// }


type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type mapDispatchToPropsType = {
    addMessages: () => void
    onMessageChange: (body: string) => void

}
export type DialogsPropsType = MapStateToPropsType & mapDispatchToPropsType

// подключили react-redux
let mapStateToProps = (state: AllAppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addMessages: () => dispatch(addMessagesActionCreator()),
        onMessageChange: (body: string) => dispatch(onMessageChangeActionCreator(body))
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

//HOC создает контейненрную компаненту вокруг ProfileContainer
// const AuthRedirectComponent = withAuthRedirect(Dialogs)
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
//
// export default DialogsContainer;



