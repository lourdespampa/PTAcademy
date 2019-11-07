import React, { Component } from 'react';
import ProfTemporizador from '../components/temporizador/temporizador'

class Temporizador extends Component {
  componentDidMount(){
    
  }
  render(){

    return (
      <div>
        <ProfTemporizador/>
        <div className="container">
          <input type="text" placeholder="ingresar el tiempo a pasar"/>
          se van a seguir haciendo pruebas
        </div>
      </div>
    )
  }
}

export default Temporizador;