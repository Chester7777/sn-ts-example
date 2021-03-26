import React from "react";
import {addMessagesActionCreator, DialogsPageType, onMessageChangeActionCreator} from "../../redux/dialogsPage-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";
import {Dispatch} from "redux";

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
    isAuth: boolean
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
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addMessages: () => dispatch(addMessagesActionCreator()),
        onMessageChange: (body: string) => dispatch(onMessageChangeActionCreator(body))
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;



