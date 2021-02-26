import React from "react";
import {addMessagesActionCreator, onMessageChangeActionCreator} from "../../redux/dialogsPage-reducer";
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

// подключили react-redux
let mapStateToProps = (state: AllAppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessages: () => dispatch(addMessagesActionCreator()),
        onMessageChange: (body: string) => dispatch(onMessageChangeActionCreator(body))
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;



