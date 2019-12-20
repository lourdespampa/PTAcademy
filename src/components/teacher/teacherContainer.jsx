
import React, { Component } from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/teacher/Header'
import Footer from '../../containers/teacher/Footer';
import Test from '../../components/teacher/chat/test';
export default class Contenido extends Component {

    
    render() {
        const {children}=this.props
        return (
               <>
               <div id="div_head">
            <Header socket={this.props.socket} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            </div>
            <Left socket={this.props.socket} view={'/teacher/:cod/pizarra'} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            <div id="div_children">
            {children}
            </div>
            <Test/>
            <div id="div_foot">
            <Footer socket={this.props.socket}  botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick} 
            changeOn={this.props.changeOn} txt={this.props.txt} />
            </div>
        </>  
        )
    }
}
