import React from 'react';
//import '../components/pizarra/pizarra.css'

//import Pizarra from './../components/pizarra/Pizarra';
import Pizarra from '../../components/teacher/pizarra/Pizarra.jsx'
import Board from '../../components/teacher/whiteboard/board';
// import Board2 from '../../components/teacher/whiteboard/board2';

//import '../components/pizarra/pizarra';
class Pizarra_page extends React.Component {


    render(){
        return(
            // <Pizarra socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
            <Board socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
            // <Board2/>
        )
    }
}

export default Pizarra_page;