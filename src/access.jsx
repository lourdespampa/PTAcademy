import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Teacher from './view/teacher'
import Student from './view/student'
import CoursesTeacher from './view/courses/CoursesTeacher';
import ClassTeacher from './view/class/ClassTeacher';
import ClassDetailTeacher from './view/class/ClassDetailTeacher';
import Login from './view//login/login'
import NotFound from './view/NotFound'
import LoginStu from './view/login.Stud/login.stu'
import FormLoginStu from './view/login.Stud/login.dataForm'
import Index from './view/index/Inicio'

export default class Access extends Component {
    state={
        nombreProfesor: "carlos",
    _id: "",
    courses: []
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={()=><Index/>} />
                    <Route exact path="/Login" component={()=><LoginStu/>} />
                    <Route exact path="/loginStudent/:id_access" component={(props)=><FormLoginStu {...props}/>} />
                    <Route exact path="/loginTeacher" component={()=><Login/>} />
                    <Route exact path="/CoursesTeacher/:id" component={(props)=><CoursesTeacher {...props}/>} />
                    <Route exact path="/:id_teacher/ClassTeacher/:_id" component={(props)=><ClassTeacher {...props} />} />
                    <Route exact path="/ClassDetailTeacher" component={()=><ClassDetailTeacher/>} />
                    <Route exact path="/teacher/:id_class/:id_access" component={Teacher} />
                    <Route exact path="/student/:id_access" component={() => <Student/>} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}
