import React, { Component } from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Container from '../components/student/studentcontainer'
import Index from '../pages/student/Index'
import Trivia from '../pages/student/Trivia'
import Temporizador from '../pages/student/temporizador'
import Board from '../pages/student/board'

//socket initial
import io from 'socket.io-client';
const socketUrl="http://192.168.1.65:4000/student";
//
export default class Student extends Component {
  constructor(props){
    super(props);
    this.state={
        id_access:'',
        socket:null,
        user:null
    };
}
componentWillMount(){
    this.initSocket()
}
initSocket=()=>{
    const socket=io(socketUrl)
    socket.on('connect',()=>{
        console.log("Student Connected")
    })
    this.setState({socket})
}
  render() {
    return (
      <BrowserRouter>
        <Container socket={this.state.socket} id_access={this.state.id_access}>
					<Switch>
						<Route exact path="/student/:cod" component={() => <Index  id_access={this.state.id_access}/>}/>
						<Route exact path="/student/:cod/trivia" component={() => <Trivia id_access={this.state.id_access}/>}/>
						<Route exact path="/student/:cod/temporizador" component={() => <Temporizador id_access={this.state.id_access}/>}/>
						<Route exact path="/student/:cod/pizarra" component={() => <Board id_access={this.state.id_access}/>}/>
						<Redirect from="/" to="/student/xxxxxx" />
					</Switch>
        </Container>
      </BrowserRouter>
    );}
}
