import React from 'react';
import logo from './logo.svg';
import './App.css';

import $ from 'jquery';
// import '';
import Left from './containers/Left';

class App extends React.Component {
  state={
    number: ''
  }

  componentDidMount = () => {
    let _this = this
    console.log("2.cdm")
    $('.btn-primary').on('click', function(){
      // alert("It's a test")
      _this.setState({number: Math.random()})
    })
  }

  render(){
    console.log('1/3. render')
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onMouseOver={aparecer} className="btn btn-primary">Learn more</button>
        <h2>{this.state.number}</h2>
      </header>
      <Left />
    </div>
  );
  }
}

function aparecer(){
  console.log("hola");
}

export default App;
