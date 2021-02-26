import React from "react";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/Redux-store";

//самодельный контейнер
// type PropsType = {
//     store: StoreType
// }
// const NavbarContainer = () => {
//     return (
//
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     const state = store.getState().sidebar
//                     return (
//                         <Navbar friends={state.friends} />
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }


// подключили react-redux
let mapStateToProps = (state: AllAppStateType) => {
    return {
        state: state.sidebar
    }
}
let mapDispatchToProps = () => {
    return {

    }
}

let NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;


