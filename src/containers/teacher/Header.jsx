import React from 'react';
import Empatia from '../../components/teacher/header/Empatia';
import HeaderCode from '../../components/teacher/header/HeaderCode';

class Header extends React.Component{

    state = {}


    render(){
        return(
            <>
                <HeaderCode/>
                <Empatia />
            </>
        )
    }
}

export default Header;