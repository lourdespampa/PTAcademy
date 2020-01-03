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
const url = "http://3.16.110.136:4200";
const socketUrl="http://192.168.1.65:4000/student";
//
export default class Student extends Component {
  constructor(props){
    super(props);
    this.state={
        id_access:'',
        socket:null,
        id_student:'',
        name:'',
        lastName:''
    };
}
componentWillMount(){
    this.initSocket()
}
async componentDidMount() {
 const {
    match: { params }
  } = this.props;
  this.setState({id_student:params.id_student,id_access:params.id_access})
  console.log("id estudent: "+params.id_student);

  const res= await axios.get(`${url}/v1/api/admin/student/${params.id_student}`)
    console.log(res.data)
    this.setState({
      name:res.data.name_stu,
      lastName:res.data.lastName_stu
    })
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
      <Switch>
        <Route exact path="/" component={()=><Access/>} />
        <Container socket={this.state.socket} id_access={this.state.id_access} id_student={this.state.id_student} name={this.state.name} lastName={this.state.lastName}>
					
						<Route exact path="/student/:id/:cod" component={() => <Index  id_access={this.state.id_access} id_student={this.state.id_student}  />}/>
						<Route exact path="/student/:id/:cod/trivia" component={() => <Trivia id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
						<Route exact path="/student/:id/:cod/temporizador" component={() => <Temporizador id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
						<Route exact path="/student/:id/:cod/pizarra" component={() => <Board id_access={this.state.id_access} id_student={this.state.id_student}/>}/>
            {/* <Redirect from="/" to="/student/:id/:cod" /> */}
        </Container>
        </Switch>
      </BrowserRouter>
    );}
}
