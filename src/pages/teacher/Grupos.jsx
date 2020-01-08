import React from 'react';
import GruposPage from '../../components/teacher/grupos/GrupoPage'

class Grupos extends React.Component {
    render(){
        return(
            <div>
                <GruposPage id_access={this.props.id_access} socketUrl={this.props.socketUrl}/>
            </div>
        )
    }
}
export default Grupos;
