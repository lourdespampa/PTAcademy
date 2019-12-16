import React, { Component } from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Teacher from './view/teacher'
import Student from './view/student'

export default class General extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/teacher" component={() => <Teacher/>} />
                    <Route path="/student" component={() => <Student/>} />
                    <Redirect from="/" to="/teacher" />
                </Switch>
            </BrowserRouter>
        )
    }
}
