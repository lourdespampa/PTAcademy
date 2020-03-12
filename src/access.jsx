import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Teacher from "./view/teacher";
import Student from "./view/student";
import CoursesTeacher from "./view/courses/CoursesTeacher";
import ClassTeacher from "./view/class/ClassTeacher";
import ClassDetailTeacher from "./view/class/ClassDetail/ClassDetailTeacher";
import Login from "./view//login/login";
import NotFound from "./view/404/NotFound";
import LoginStu from "./view/login.Stud/login.stu";
import FormLoginStu from "./view/login.Stud/login.dataForm";
import Index from "./view/index/Inicio";
import CourseDetailTeacher from "./view/courses/CourseDetail/CourseDetail";
// se va poner los componentes de dos login de alumnos
import LoginSchool from "./view/login.Stud/loginSchool";
import LoginPrivate from "./view/login.Stud/loginPrivate";
//terminos y condiciones
import TerminosCondiciones from "./Terminos";

export default class Access extends Component {
  state = {
    // apiUrl: "http://3.16.110.136:4200" serivdor antiguo solo para sockets
    apiUrl:'http://3.135.172.97:4200' //servidor nuevo para back
    // apiUrl:'http://192.168.1.66:4200' //servidor de manera local
  };
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route
            exact
            path="/terminos-condiciones"
            component={TerminosCondiciones}
          />
          <Route
            exact
            path="/Login"
            component={() => <LoginStu apiUrl={this.state.apiUrl} />}
          />
          <Route
            exact
            path="/:id/course_detail/:id_course"
            component={props => (
              <CourseDetailTeacher {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            exact
            path="/loginTeacher"
            component={() => <Login apiUrl={this.state.apiUrl} />}
          />
          <Route
            exact
            path="/CoursesTeacher/:id"
            component={props => (
              <CoursesTeacher {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            exact
            path="/:id_teacher/ClassTeacher/:_id"
            component={props => (
              <ClassTeacher {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            exact
            path="/ClassDetailTeacher/:id"
            component={props => <ClassDetailTeacher {...props} apiUrl={this.state.apiUrl} />}
          />
          <Route
            path="/teacher/:id_class/:id_access"
            component={props => (
              <Teacher {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            path="/student/:id_student/:id_access"
            component={props => (
              <Student {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route exact path="/notfound" component={NotFound} />
          {/* se van a poner las rutas de login de los dos tipos de estudiantes */}
          <Route
            exact
            path="/loginStudent/:id_access"
            component={props => (
              <FormLoginStu {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            exact
            path="/loginStudentSchool/:id_access"
            component={props => (
              <LoginSchool {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          <Route
            exact
            path="/loginStudentPrivate/:id_access"
            component={props => (
              <LoginPrivate {...props} apiUrl={this.state.apiUrl} />
            )}
          />
          {/* se termina las rutas de login de estudiante */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
