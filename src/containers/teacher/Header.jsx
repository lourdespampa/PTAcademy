import React from 'react';
import Empatia from '../../components/teacher/header/Empatia';
import HeaderCode from '../../components/teacher/header/HeaderCode';

class Header extends React.Component{

    state = {}


    render(){
        return(
            <>
                <HeaderCode id_access={this.props.id_access} />
                <Empatia id_access={this.props.id_access} id_class={this.props.id_class}/>
            </>
        )
    }
}

export default Header;