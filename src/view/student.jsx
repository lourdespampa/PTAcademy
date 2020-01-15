import React, { Component } from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Container from '../components/student/studentcontainer'
import Index from '../pages/student/Index'
import Trivia from '../pages/student/Trivia'
import Temporizador from '../pages/student/temporizador'
import Board from '../pages/student/board'

import Access from '../access'
//socket initial
import io from 'socket.io-client';
import axios from "axios";
//
export default class Student extends Component {
  constructor(props){
    super(props);
    this.state={
        id_access:'',
        // socketUrl:"http://localhost:4000/student",
        socketUrl:"http://3.16.110.136:4000/student",
        id_student:'',
        name:'',
        lastName:''
    };
}
componentWillMount(){
    this.initSocket()
}
async componentDidMount() {
  var varToken = localStorage.getItem('token');
 const {
    match: { params }
  } = this.props;
  this.setState({id_student:params.id_student,id_access:params.id_access})
  console.log("id estudent: "+params.id_student+" id Acceso: "+params.id_access);

  const res= await axios({
    url: `${this.props.apiUrl}/v1/api/admin/student/${params.id_student}`,
    method: 'GET',
    headers: {
      'x-access-token': `${varToken}`
    }
  })
    this.setState({
      name:res.data.name_stu,
      lastName:res.data.lastName_stu
    })
}
initSocket=()=>{
    const socket=io(this.state.socketUrl)
    socket.on('connect',()=>{
        console.log("Student Connected")
    })
}
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={()=><Access/>} />
        <Container apiUrl={this.props.apiUrl} socketUrl={this.state.socketUrl} id_access={this.state.id_access} id_student={this.state.id_student} name={this.state.name} lastName={this.state.lastName}>
					
						<Route exact path="/student/:id/:cod" component={() => <Index socketUrl={this.state.socketUrl} id_access={this.state.id_access} id_student={this.state.id_student}  />}/>
						<Route exact path="/student/:id/:cod/trivia" component={() => <Trivia socketUrl={this.state.socketUrl} id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
						<Route exact path="/student/:id/:cod/temporizador" component={() => <Temporizador socketUrl={this.state.socketUrl} id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
						<Route exact path="/student/:id/:cod/pizarra" component={() => <Board socketUrl={this.state.socketUrl} id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
            {/* <Redirect from="/" to="/student/:id/:cod" /> */}
        </Container>
        </Switch>
      </BrowserRouter>
    );}
}
