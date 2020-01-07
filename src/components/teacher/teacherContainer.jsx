
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
            <Header id_access={this.props.id_access} id_class={this.props.id_class} socketUrl={this.props.socketUrl} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            </div>
            <Left socketUrl={this.props.socketUrl} view={`/teacher/${this.props.id_class}/${this.props.id_access}/pizarra`} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
            <div id="div_children">
            {children}
            </div>
            <Test/>
            <div id="div_foot">
            <Footer socket={this.props.socket} socketUrl={this.props.socketUrl} id_access={this.props.id_access} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick} 
            changeOn={this.props.changeOn} txt={this.props.txt} />
            </div>
        </>  
        )
    }
}
