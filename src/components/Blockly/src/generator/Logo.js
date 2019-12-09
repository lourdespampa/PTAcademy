import React from 'react'
import './Styles/Logo.css'
import HeaderLogo from '../Imagenes/logo.png'
import Logo2 from '../Imagenes/playedu-icon.png'

class Logo extends React.Component {
    render() {
        return<a href="http://playtecedu.com/herramientas">
              <img className="Logo2"src={Logo2} alt="logo2" title="Hi!"/>
              <img className="Logo" src={HeaderLogo} alt="Logo"/></a>  
                  
    }
}
export default Logo;