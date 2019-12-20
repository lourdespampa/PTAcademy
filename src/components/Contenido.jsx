
import React, { Component } from 'react'
import Left from '../containers/teacher/Left'
import Header from '../containers/teacher/Header'
import Footer from '../containers/teacher/Footer';

import io from 'socket.io-client';
const socketUrl="http://localhost:4000";
export default class Contenido extends Component {
    constructor(props){
        super(props);
        this.state={
            socket:null,
            user:null
        };
    }
    componentWillMount(){
        this.initSocket()
    }
    initSocket=()=>{
        const socket=io(socketUrl)
        socket.on('connect',()=>{
            console.log("connected")
        })
        this.setState({socket})
    }
    render() {
        const {children}=this.props
        return (
               <>
            <Header  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            <Left  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            {children}
            <Footer  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick} 
            changeOn={this.props.changeOn} txt={this.props.txt} />
        </>  
        )
    }
}
