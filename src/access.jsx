import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Teacher from './view/teacher'
import Student from './view/student'
import CoursesTeacher from './view/courses/CoursesTeacher';
import ClassTeacher from './view/class/ClassTeacher';
import ClassDetailTeacher from './view/class/ClassDetailTeacher';
import Login from './view//login/login'
import NotFound from './view/404/NotFound'
import LoginStu from './view/login.Stud/login.stu'
import FormLoginStu from './view/login.Stud/login.dataForm'
import Index from './view/index/Inicio'

export default class Access extends Component {
    state={
    apiUrl:'http://3.16.110.136:4200',
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/Login" component={()=><LoginStu apiUrl={this.state.apiUrl} />} />
                    <Route exact path="/loginStudent/:id_access" component={(props)=><FormLoginStu {...props} apiUrl={this.state.apiUrl} />} />
                    <Route exact path="/loginTeacher" component={()=><Login apiUrl={this.state.apiUrl}/>}  />
                    <Route exact path="/CoursesTeacher/:id" component={(props)=><CoursesTeacher {...props} apiUrl={this.state.apiUrl} />} />
                    <Route exact path="/:id_teacher/ClassTeacher/:_id" component={(props)=><ClassTeacher {...props} apiUrl={this.state.apiUrl} />} />
                    <Route exact path="/ClassDetailTeacher" component={()=><ClassDetailTeacher apiUrl={this.state.apiUrl} />} />
                    <Route path="/teacher/:id_class/:id_access" component={(props)=><Teacher {...props} apiUrl={this.state.apiUrl} />}  />
                    <Route path="/student/:id_student/:id_access" component={(props) => <Student {...props} apiUrl={this.state.apiUrl}/>}  />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}
