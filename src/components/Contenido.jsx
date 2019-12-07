
import React, { Component } from 'react'
import Left from '../containers/Left'
import Header from '../containers/Header'
import Footer from '../containers/Footer';
//import Chat from '../components/chat/chat.jsx'
import Test from '../components/chat/test';
import Comunicacion from '../components/right/Comunicacion'

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
               <div id="div_head">
            <Header />
            </div>
            <Left />
            <div id="div_children"> 
            {children}
            </div>
            <Test/>
            <div id="div_foot">
                <Footer />
            </div>
        </>  
        )
    }
}
