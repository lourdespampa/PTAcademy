
import React, { Component } from 'react'
import Left from '../containers/Left'
import Header from '../containers/Header'
import Footer from '../containers/Footer';

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
            <Header />
            <Left />
            {children}
            <Footer />
        </>  
        )
    }
}
