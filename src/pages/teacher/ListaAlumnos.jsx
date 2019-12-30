import React from 'react';

import ListaAlum from '../../components/teacher/lista/ListaAlum';
class ListaAlumnos extends React.Component {


    render(){
        return(
            <ListaAlum id_access={this.props.id_access} />
        )
    }
}

export default ListaAlumnos;