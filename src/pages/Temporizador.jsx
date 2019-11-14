import React, { Component } from 'react';
import ProfTemporizador from '../components/temporizador/temporizador'

class Temporizador extends Component {
  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }


componentWillUnmount() {
  clearInterval(this.myInterval)
}
state = {
  minutes: 3,
  seconds: 0
}
render(){
  const { minutes, seconds } = this.state;
  return (
    <>
      <ProfTemporizador />
      <div className="container">
        <input type="number" className="input-minutes"/>
        <h1>Esta en iniciando en {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
    </>
  )
}
}

export default Temporizador;