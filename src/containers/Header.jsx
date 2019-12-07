import React from 'react';
import Empatia from './../components/header/Empatia';
import HeaderCode from './../components/header/HeaderCode';

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