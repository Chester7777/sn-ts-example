import React from "react";
import preloader from "../../../asseds/images/icons8_Spinner.gif";


let Preloader: React.FC = () => {

    return <div style={{paddingLeft: "700px", paddingTop: "150px"}}>
         <img src={preloader}/>
    </div>
}

export default Preloader;