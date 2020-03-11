import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Contenido from "../components/teacher/teacherContainer";
import ListaAlumnos from "../pages/teacher/ListaAlumnos";
import Azar from "../pages/teacher/Azar";
import Grupos from "../pages/teacher/Grupos";
import Temporizador from "../pages/teacher/Temporizador";
import Trivia from "../pages/teacher/Trivia";
import Pizarra from "../pages/teacher/Pizarra";
import Access from "../access";
import NotFound from "./404/NotFound";
import Bloque from '../components/teacher/blocky/App'
//socket initial
// import io from 'socket.io-client'; //no se esta usando
//

export default class Views extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      class: "clase3",
      // socketUrl:"http://192.168.1.24:4000/teacher",
      socketUrl: "http://3.16.110.136:4000/teacher",
      user: null,
      id: "",
      grabar: false,
      tiempoinicio: "0",
      tiempo1: "0",
      txt: "",
      grabacion: [],
      id_class: "",
      id_access: "",
      school: "",
      todo: []
    };
  }
  componentDidMount() {
    var varToken = localStorage.getItem("token");
    axios({
      url: `${this.props.apiUrl}/v1/api/teacher/detail_class/${this.state.id_class}`,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    })
      .then(res => {
        this.setState({
          school: res.data.school
        });
        console.log("se esta pasando para el contenedor", this.state.school);
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillMount() {
    this.getRecord();
    const {
      match: { params }
    } = this.props;
    this.setState({
      id_class: params.id_class,
      id_access: params.id_access,
      todo: this.props.location.state
    });
    // console.log("id class: " + params.id_class);
    // console.log("codigo generado: " + params.id_access);
    // console.log("para la clase", this.props.location.state);
  }

  getRecord = async () => {
    var varToken = localStorage.getItem("token");
    const res = await axios({
      url:
        "https://academy-api-v3.herokuapp.com/api/events/" +
        this.state.id_class,
      method: "GET",
      headers: {
        "x-access-token": `${varToken}`
      }
    });
    this.setState({
      grabacion: await res.data
    });
    console.log(this.state.grabacion);
  };
  botonClick = async name => {
    if (this.state.grabar === true) {
      var toma1 = Date.now();
      var t1 = toma1 - this.state.tiempoinicio;
      this.setState({ tiempo1: t1 });
      console.log("{id:" + name + ",funcion:click ,tiempo:" + t1 + "},");

      const params = {
        name: name,
        time: t1,
        Function: "click",
        valor: "",
        class: this.state.id_class
      };
      await axios.post(
        "https://academy-api-v3.herokuapp.com/api/events",
        params
      );
    } else {
    }
  };
  changeOn = async (id, value) => {
    if (this.state.grabar === true) {
      var toma1 = Date.now();
      var t1 = toma1 - this.state.tiempoinicio;
      this.setState({ tiempo1: t1 });
      console.log(
        "{id:" + id + ",funcion:onChange ,url:" + value + ",tiempo:" + t1 + "}"
      );
      const params = {
        name: id,
        time: t1,
        Function: "onChange",
        valor: value,
        class: this.state.id_class
      };
      await axios.post(
        "https://academy-api-v3.herokuapp.com/api/events",
        params
      );
    } else {
    }
  };
  grabar = () => {
    var tomaInicio = Date.now();
    this.setState({ grabar: true, tiempoinicio: tomaInicio });
  };
  repro = (id, funcion, value, tiempo) => {
    if (funcion === "onChange") {
      this.statetxt(value, tiempo);
    } else if (funcion === "click") {
      setTimeout(function runAsync() {
        document.getElementById(id).click();
      }, tiempo);
    } else {
    }
  };
  statetxt = (value, tiempo) => {
    setTimeout(() => {
      this.setState({ txt: value });
      console.log(this.state.txt + tiempo);
    }, tiempo);
  };

  reproclick = () => {
    this.state.grabacion.map(grab =>
      this.repro(grab.name, grab.Function, grab.valor, grab.time)
    );
  };
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Access />} />
          <Route
            exact
            path="/CoursesTeacher/:id"
            component={props => (
              <Access {...props} apiUrl={this.props.apiUrl} />
            )}
          />
          <Route exact path="/notfound" component={NotFound} />
          <Contenido
            id_access={this.state.id_access}
            socket={this.state.socket}
            id_class={this.state.id_class}
            socketUrl={this.state.socketUrl}
            botonClick={this.botonClick}
            grabar={this.grabar}
            reproclick={this.reproclick}
            changeOn={this.changeOn}
            apiUrl={this.props.apiUrl}
            txt={this.state.txt}
          >
            <Route
              exact
              path="/teacher/:id_class/:id_access"
              component={() => (
                <ListaAlumnos
                  id_access={this.state.id_access}
                  todo={this.state.todo}
                  school={this.state.school}
                  socketUrl={this.state.socketUrl}
                  apiUrl={this.props.apiUrl}
                  id_class={this.state.id_class}
                />
              )}
            />
            <Route
              exact
              path="/teacher/:id_class/:id_access/azar"
              component={() => (
                <Azar
                  todo={this.state.todo}
                  school={this.state.school}
                  id_access={this.state.id_access}
                  apiUrl={this.props.apiUrl}
                  socketUrl={this.state.socketUrl}
                />
              )}
            />
            <Route
              exact
              path="/teacher/:id_class/:id_access/grupos"
              component={() => (
                <Grupos
                  todo={this.state.todo}
                  school={this.state.school}
                  id_access={this.state.id_access}
                  apiUrl={this.props.apiUrl}
                  socketUrl={this.state.socketUrl}
                />
              )}
            />
            <Route
              exact
              path="/teacher/:id_class/:id_access/temporizador"
              component={() => (
                <Temporizador
                  id_access={this.state.id_access}
                  socketUrl={this.state.socketUrl}
                />
              )}
            />
            <Route
              exact
              path="/teacher/:id_class/:id_access/pizarra"
              component={() => (
                <Pizarra
                  id_access={this.state.id_access}
                  socketUrl={this.state.socketUrl}
                />
              )}
            />
            <Route
              exact
              path="/teacher/:id_class/:id_access/trivia"
              component={() => (
                <Trivia
                  school={this.state.school}
                  id_access={this.state.id_access}
                  apiUrl={this.props.apiUrl}
                  socketUrl={this.state.socketUrl}
                />
              )}
            />
            <Route exact path="/teacher/:id_class/:id_access/bloque"
              component={() => <Bloque id_access={this.state.id_access} socketUrl={this.state.socketUrl} />} />
            {/* <Redirect from="/" to="/teacher/xxxxx" /> */}
          </Contenido>
        </Switch>
      </BrowserRouter>
    );
  }
}
