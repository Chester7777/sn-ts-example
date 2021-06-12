import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {RouteComponentProps} from "react-router-dom";


export let WithSuspense = (Component: React.ComponentType<any>) => (props: RouteComponentProps<{}, any, unknown>) => {
    return (
        <React.Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </React.Suspense>
    )
};