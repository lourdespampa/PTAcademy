import React from 'react';

import Left from '../containers/Left'
import Header from '../containers/Header'
import Footer from '../containers/Footer';

function Contenido (props){

    return (
        <>
            <Header />
            <Left />
            {props.children}
            <Footer />
        </>
    )
}

export default Contenido;