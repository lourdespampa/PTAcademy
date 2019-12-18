import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import axios from 'axios'
import Contenido from './components/Contenido';
import ListaAlumnos from './pages/teacher/ListaAlumnos';
import Azar from './pages/teacher/Azar';
import Grupos from './pages/teacher/Grupos';
import Temporizador from './pages/teacher/Temporizador';
import Trivia from './pages/teacher/Trivia';
// import NotFound from '../pages/NotFound';

class App extends Component {
   state={
      class:'clase3',
      socket:null,
      user:null,
      id:'',
      grabar:false,
      tiempoinicio:'0',
      tiempo1:'0',
      txt:'',
      grabacion:[]
    };
  async componentDidMount() {
      this.getRecord();
  }
  getRecord = async () => {
    const res = await axios.get('https://academy-api-v3.herokuapp.com/api/events/'+this.state.class)
    this.setState({
      grabacion :  await res.data
    });
    console.log(this.state.grabacion)
  }
botonClick=async(name)=> {
  if(this.state.grabar===true){
  var toma1 = Date.now();
  var t1=(toma1-this.state.tiempoinicio);
  this.setState({tiempo1:t1})
  console.log('{id:'+name+',funcion:click ,tiempo:'+t1+'},')

  const params={
    name : name,time : t1 , Function : 'click', valor : '',class:this.state.class
}
await axios.post('https://academy-api-v3.herokuapp.com/api/events',params)
}else{
  };
}
changeOn=async(id,value)=>{
  if(this.state.grabar===true){
    var toma1 = Date.now();
    var t1=(toma1-this.state.tiempoinicio);
    this.setState({tiempo1:t1})
    console.log('{id:'+id+',funcion:onChange ,url:'+value+',tiempo:'+t1+'}')
    const params={
      name : id,time : t1 , Function : 'onChange', valor : value,class:this.state.class
  }
  await axios.post('https://academy-api-v3.herokuapp.com/api/events',params)
  }else{
    };
}
grabar=()=>{
  var tomaInicio = Date.now();
  this.setState({grabar:true,tiempoinicio:tomaInicio})
}
repro=(id,funcion,value,tiempo)=>{
  if(funcion==='onChange'){
    this.statetxt(value,tiempo)
  }else if(funcion==='click'){
  setTimeout(function runAsync(){
  document.getElementById(id).click()
  },tiempo)
  }else{}
}
statetxt=(value,tiempo)=>{
  setTimeout(()=>{
    this.setState({txt:value})
    console.log(this.state.txt+tiempo)
  },tiempo)
  
}

reproclick=()=>{
this.state.grabacion.map(grab=>(
  this.repro(grab.name,grab.Function,grab.valor,grab.time)
))}
render(){
  return (
    <BrowserRouter>
      <Contenido botonClick={this.botonClick} grabar={this.grabar} reproclick={this.reproclick} changeOn={this.changeOn} txt={this.state.txt}>
        <Switch>
          <Route exact path="/lista" component={() => <ListaAlumnos/>}  />
          <Route exact path="/azar/:user" component={() => <Azar/>} />
          <Route exact path="/grupos/:user" component={() => <Grupos/>} />
          <Route exact path="/temporizador/:user" component={() => <Temporizador/>} />
          <Route exact path="/trivia/:user" component={() => <Trivia botonClick={this.botonClick}/>} />
          {/* <Route path="/404" component={NotFound} /> */}
          <Redirect from="/" to="/lista" />
        </Switch>
      </Contenido>
    </BrowserRouter>
  );}
}

export default App;
