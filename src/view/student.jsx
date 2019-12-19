import React, { Component } from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Container from '../components/studentcontainer'
import Index from '../pages/student/Index'
import Trivia from '../pages/student/Trivia'
import Temporizador from '../pages/student/temporizador'
import Board from '../pages/student/board'

export default class Student extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
					<Switch>
						<Route exact path="/student/:cod" component={() => <Index/>}/>
						<Route exact path="/student/:cod/trivia" component={() => <Trivia/>}/>
						<Route exact path="/student/:cod/temporizador" component={() => <Temporizador/>}/>
						<Route exact path="/student/:cod/pizarra" component={() => <Board/>}/>
						<Redirect from="/" to="/student/xxxxxx" />
					</Switch>
        </Container>
      </BrowserRouter>
    )
  }
}
