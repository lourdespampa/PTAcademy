import React from 'react';
const Logo = () => <img className="icon icons8-Tomato" src="data:image/png;base64,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" width="50" height="50" />

class Temporizador extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 250,
      workTime: 1500,
      seconds: 1500,
      timerId: false,
      active: 'workTime'
    }

    this.playStop = this.playStop.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  // 
  updateTime() {
    this.setState(function(prevState, props) {
      const currentState = Object.assign(prevState);
      const stillActive = (prevState.seconds - 1) > 0;
      const nextTimer = prevState.active === 'workTime' ? 'breakTime' : 'workTime'

      currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];
      currentState.active = stillActive ? currentState.active : nextTimer;
      if (this.timerID) {
        currentState.timerId = this.timerID;
      }
      return currentState;
    });
  }

  // 
  playStop() {
      if (this.state.timerId) {
        clearInterval(this.state.timerId);
        return this.setState({
          seconds: this.state.workTime,
          timerId: false,
          active: 'workTime'
        });
      }

      this.timerID = setInterval(() => this.updateTime(), 1000)
    }
    // 
  updateLength(timer, e) {
    if (this.state.timerId) {
      return false;
    }
    
    const state = Object.assign({}, this.state);
    state[timer] = e.target.value * 60;
    state.seconds = timer === 'workTime' ? e.target.value * 60 : state.seconds
    this.setState(state);
  }
  render() {
    const buttonString = this.state.timerId ? 'Stop' : 'Start';
    return (
      <div className="app">
        <Logo />
        <Time active={this.state.active} seconds={this.state.seconds} />
        <Button action={this.playStop}>{buttonString}</Button>
        <Option value={this.state.workTime} timer="workTime" updateLength={this.updateLength.bind(this)}>Minutes of work</Option>
        <Option value={this.state.breakTime} timer="breakTime" updateLength={this.updateLength.bind(this)}>Minutes of break</Option>
      </div>
    )
  }
}

class Option extends React.Component {
  onChange (e) {
    e.preventDefault();
    this.props.updateLength(this.props.timer, e)
  }
  
  convertToMinutes (seconds) {
    return Math.floor(seconds / 60);
  }
  
  render() {
    return (
      <label className="input-group">
      {this.props.children}
      <input className="input-group__input" type="number" min="1" step="1" placeholder="Insert minutes" onChange={this.onChange.bind(this)} value={this.convertToMinutes(this.props.value)} />
      </label>
    )
  }
}

const Button = (props) => <button className="btn" onClick={props.action}>{props.children}</button>

class Time extends React.Component {
  twoDigits(num) {
    return num > 9 ? "" + num : "0" + num;
  }

  convertToHhMmSs(seconds) {
    const h = this.twoDigits(Math.floor(seconds / 3600));
    const m = this.twoDigits(Math.floor((seconds % 3600) / 60));
    const s = this.twoDigits(Math.floor(seconds % 3600 % 60));
    return `${h}:${m}:${s}`;
  };

  render() {
    var remainingTime = this.convertToHhMmSs(this.props.seconds);
    var activeTimer = this.props.active === 'workTime' ? 'It\'s time to work!' : 'Take a little break';

    return (
      <div className="timer">
        <p className="timer__description">{activeTimer}</p>
        <p className="timer__time">{remainingTime}</p>
      </div>
    )
  }
}
export default Temporizador;