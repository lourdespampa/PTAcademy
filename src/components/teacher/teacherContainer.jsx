
import React, { Component } from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/teacher/Header'
import Footer from '../../containers/teacher/Footer';
import { Redirect } from 'react-router-dom';
// import Test from '../../components/teacher/chat/test';
export default class Contenido extends Component {

    state = {
        token: false
    }

    UNSAFE_componentWillMount = async () => {
        let tokenStorage = localStorage.getItem("token")
        await this.setState({token: tokenStorage})
      };

    cerrarSesion = () => {
        localStorage.clear();
        this.setState({token: false})
    }
    
    render() {
        const {children}=this.props
        return (
            <>
            {this.state.token ? null : <Redirect to="/"></Redirect>}
            <div className="main-teacher-container">
                <Header cerrarSesion={this.cerrarSesion} id_access={this.props.id_access} apiUrl={this.props.apiUrl} id_class={this.props.id_class} socketUrl={this.props.socketUrl} botonClick={this.props.botonClick} grabar={this.props.grabar} reproclick={this.props.reproclick}/>
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
