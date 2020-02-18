
import React, { Component } from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/teacher/Header'
import Footer from '../../containers/teacher/Footer';
// import Test from '../../components/teacher/chat/test';
export default class Contenido extends Component {
componentDidMount(){
    // const { match: { params } } = this.props;
    // console.log("en clase pasando compentencias", this.props.location.state)
    // console.log()
    
    window.addEventListener("beforeunload", (ev) => 
    {  
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
}
    render() {
        const {children}=this.props
        return (
            <>
            <div className="main-teacher-container">
                <Header id_access={this.props.id_access} apiUrl={this.props.apiUrl} id_class={this.props.id_class} socketUrl={this.props.socketUrl} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
                <Left socketUrl={this.props.socketUrl} view={`/teacher/${this.props.id_class}/${this.props.id_access}/pizarra`} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
                <div id="div_children">
                    {children}
                </div>
                <Footer apiUrl={this.props.apiUrl} id_class={this.props.id_class} socket={this.props.socket} socketUrl={this.props.socketUrl} id_access={this.props.id_access} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick} 
                changeOn={this.props.changeOn} txt={this.props.txt} />
            </div>
        </>  
        )
    }
}
