import React from 'react';
import './temp.css';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: 0,
      restFlag: false,
      timer: 0,
      started: false
    };
    this.interval = null;
    this.url =
      'http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav';
    this.audio = new Audio(this.url);

    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({
      timer: event.target.value * 60
    });
    console.log(this.state.timer);
  }

  handleClickSessionDecrement() {
    this.setState(prevState => ({
      sessionTime: Math.max(prevState.sessionTime - 1, 1),
      timer: Math.max((prevState.sessionTime - 1) * 60, 1 * 60)
    }));
  }

  handleClickSessionIncrement() {
    this.setState(prevState => ({
      sessionTime: Math.min(prevState.sessionTime + 1, 60),
      timer: Math.min((prevState.sessionTime + 1) * 60, 50 * 60)
    }));
  }

  handleStart() {
    if (this.state.started === false) {
      this.interval = setInterval(() => {
        if (this.state.timer <= 0) {
          this.setState({
            timer: this.state.sessionTime * 60
          });
          clearInterval(this.interval);
          this.audio.play();
        }

        this.setState(prevState => ({
          timer: prevState.timer - 1
        }));
      }, 1000);
      //se tiene que enviar el socket de iniciar

      this.setState({
        started: true
      });
    } else {
      clearInterval(this.interval);
      this.setState({
        started: false
      });
      //se tiene que enviar el socket de pausa
    }
  }

  handleReset() {
    clearInterval(this.interval);
    this.setState({
      timer: 0,
      started: false,
      sessionTime: 15
    });
    //se envia el socket de reiniciar tiempo
  }

  render() {
    let timer = parseFloat(this.state.timer);

    function convertToMinutesAndSeconds(sec) {
      var minutes = Math.floor(sec / 60);
      var seconds = (sec % 60).toFixed(0);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
      <div className="App">
          <Header></Header>
        <div id="clockWrapper" className="clockBackground">
          <div id="sessionBox">
            <div id="session-label">
                Ingregar minutos
              <input
                id="session-length"
                type="number"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
            <StartStop
              timer={convertToMinutesAndSeconds(timer)}
              handleStart={this.handleStart}
              handleStop={this.handleStop}
              handleReset={this.handleReset}
              coundtdown={this.state.timer}
              togglePlay={this.togglePlay}
              started={this.state.started}
            />
        </div>
      </div>
    );
  }
}

const Header = () => {
    return <h1 id="header"> Cronometro de PlayTec Academy</h1>;
  };

const StartStop = props => {
  return (
    <div id="timerBox">
      <div id="timer-label">
        <p id="time-left" style={{ color: '#ff8360' }}>
          {props.timer}
        </p>
      </div>
      {/* Start, Stop and Reset Button*/}
      
        <div id="start_stop" onClick={props.handleStart}>
          {props.started ? (
            <h3>Pausa</h3>
          ) : (
            <h3>Iniciar</h3>
          )}
        </div>

        <div id="reset" onClick={props.handleReset}>
        <h3>Reniiciar</h3>
        </div>
      
    </div>
  );
};

export default Pomodoro;