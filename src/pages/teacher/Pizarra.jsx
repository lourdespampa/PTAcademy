import React from 'react';
import Board from '../../components/teacher/whiteboard/board';

class Pizarra_page extends React.Component {


    render(){
        return(
                <Board socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
        )
    }
}

export default Pizarra_page;