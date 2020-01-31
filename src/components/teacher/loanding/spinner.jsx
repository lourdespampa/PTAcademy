import React, { Component } from "react";
import  "./spinner.css";

class spinner extends Component {
    render() {

        return (
            <div className="padre">
            
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        )
     }
}

 
export default spinner;
