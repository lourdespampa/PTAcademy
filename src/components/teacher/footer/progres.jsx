import React, { Component } from "react";
import  "./progress.css";

class progres extends Component {
    render() {

        return (
            <div className="wrapper" data-anim="base wrapper">
                <div className="circle" data-anim="base left"></div>
                <div className="circle" data-anim="base right"></div>
            </div>
        
        )
     }
}

 
export default progres;
