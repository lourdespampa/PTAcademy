import React , {Component} from 'react';
import Temp from '../../components/teacher/temporizador/temporizador'

export default class Temporizador extends Component {


    render(){
        return(
            <div>
                <Temp socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
            </div>
        )
    }
}
