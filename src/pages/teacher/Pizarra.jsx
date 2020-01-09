import React from 'react';
//import '../components/pizarra/pizarra.css'

//import Pizarra from './../components/pizarra/Pizarra';
import Pizarra from '../../components/teacher/pizarra/Pizarra.jsx'
//import '../components/pizarra/pizarra';
class Pizarra_page extends React.Component {


    render(){
        return(
            <Pizarra socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>

        )
    }
}

export default Pizarra_page;