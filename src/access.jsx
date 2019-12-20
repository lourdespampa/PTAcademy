import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Teacher from './view/teacher'
import Student from './view/student'
import CoursesTeacher from './view/CoursesTeacher';
import ClassTeacher from './view/ClassTeacher';
import ClassDetailTeacher from './view/ClassDetailTeacher';
import Login from './view/login'
import NotFound from './view/NotFound'
export default class Access extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={()=><Login/>} />
                    <Route exact path="/CoursesTeacher/:id" component={CoursesTeacher} />
                    <Route exact path="/ClassTeacher/:_id" component={ClassTeacher} />
                    <Route exact path="/ClassDetailTeacher" component={()=><ClassDetailTeacher/>} />
                    <Route path="/teacher" component={() => <Teacher/>} />
                    <Route path="/student" component={() => <Student/>} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}
