
import React, { Component } from 'react'
import Left from '../containers/teacher/Left'
import Header from '../containers/teacher/Header'
import Footer from '../containers/teacher/Footer';
import Test from '../components/teacher/chat/test';
import io from 'socket.io-client';
// const socketUrl="http://192.168.1.65:4000/teacher";
const socketUrl="http://localhost:4000/teacher";
// const socket = io('/command', {
//     query: 'pin=<%= codigoClase %>'
// })
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
        socket.on('connection',()=>{
            console.log("Teacher Connected")
        })
        this.setState({socket})
    }
    render() {
        const {children}=this.props
        return (
               <>
               <div id="div_head">
            <Header  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            </div>
            <Left view={'/teacher/:cod/pizarra'} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            <div id="div_children">
            {children}
            </div>
            <Test/>
            <div id="div_foot">
            <Footer  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick} 
            changeOn={this.props.changeOn} txt={this.props.txt} />
            </div>
        </>  
        )
    }
}
