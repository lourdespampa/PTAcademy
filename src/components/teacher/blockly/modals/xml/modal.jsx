import react from "react";
import {
    Dialog, 
    Button, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle
}
from "@material-ui/core";


export default class modalExple extends react.Component {
    constructor(){
        super()
        this.state = {
            abierto = false
        }
    }

    abrirModal(){
        this.setState({abierto:true})
    }
    cerrarModal(){
        this.setState({abierto:false})
    }
    render(){
        
    }
    
}