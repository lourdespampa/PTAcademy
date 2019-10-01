import React from 'react';

import Left from '../containers/Left'
import Header from '../containers/Header'

function Contenido (props){

    return (
        <>
            <Header />
            <Left />
            {props.children}
        </>
    )
}

export default Contenido;