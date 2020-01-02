import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
//import '../public/css/main.css';
//import './css/main.css';
import './main.css';
//import '../public/css/bootstrap.min.css';
const socketUrl="http://localhost:4000";
export default class CHAT extends Component{
//class chat extends React.Component {
  


  constructor(props) {
    super(props);
    this.state = {
      socket:null,
      messages: []
      
    }
  }
  initSocket=()=>{
    const socket=io(socketUrl)
    socket.on('connect',()=>{
        console.log("connected")
    })
    this.setState({socket})
}

 openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  //document.getElementById("main").style.marginRight = "250px";
  document.getElementById('btn_open').style.marginRight = "250px";
  document.getElementById('div_children').style.marginRight = "250px";
  document.getElementById('div_head').style.marginRight = "250px";
  document.getElementById('div_foot').style.marginRight = "250px";
}

closeNav() {
 
  document.getElementById("mySidebar").style.width = "0px";
 // document.getElementById("main").style.marginRight = "0px";
  document.getElementById('btn_open').style.marginRight = "0px";
  document.getElementById('div_children').style.marginRight = "0px";
  document.getElementById('div_head').style.marginRight = "0px";
  document.getElementById('div_foot').style.marginRight = "0px";
}


  componentDidMount () {
const chil = document.getElementById('div_children')
/*chil.addEventListener('mouseover',()=>{
  console.log("funciona")
})*/


    const btn_close = document.getElementById('btn_close')
    btn_close.addEventListener('click',()=>{
      this.closeNav()

    })
   /* const btn_chat = document.getElementById('btn_open')
    btn_chat.addEventListener('click',()=>{
      alert("hola")
    })*/

   // this.initSocket()
   var messageBody = document.getElementById('chat-window');

 
    this.socket = io(socketUrl)

    //this.socket = io('/')
    const act = document.getElementById('actions');
    const salida = document.getElementById('salida');
   
 this.socket.on('message', message => {
    //  this.setState({ messages: [message, ...this.state.messages]})

      act.innerHTML = "";
    //  salida.innerHTML=message.body
      salida.innerHTML += `<p>
      <strong>${message.from}</strong> : ${message.body}
      <p>`
      messageBody.scrollTop = (messageBody.clientHeight - messageBody.scrollHeight)*-1;
     
    })
    
    this.socket.on('actions', message => {
      
      act.innerHTML =message.username + message.msj
    })
  }

  handleSubmit = event => {
   // username.value();
   const username_input = document.getElementById('user-name');
   const username = username_input.value;
   const salida = document.getElementById('salida');
   if(username ==""){
    alert("Nombre de usuario vacio");
  }else{
      this.socket.emit('action',username)
 
      const body = {
         body :event.target.value,
         from :username
       }
     const body2 = event.target.value
       if (event.keyCode === 13 && body) {
         const message = {
           body2,
           from: 'Me',
          
         }
         if(event.target.value==""){
          alert("Mensaje Vacio")
        }else{
          salida.innerHTML += `<p>
          <strong>${message.from}</strong> : ${message.body2}
          <p>`
          //this.setState({ messages: [message, ...this.state.messages]})
          this.socket.emit('message', body)
          event.target.value = ''
        }       
      }

  }  
  }
  render() {
    return(
      <div className="container" id="main">
        <button id="btn_close" >asdasdd</button>
        {/*<div className="titulo">
        <h1>REACT-SOCKET.IO-EXPRESS CHAT</h1>
        </div>
        
        <div className="chat-container" id="chat_cont">
        
        <div id="actions" className="actions"></div>
              
          <div id="salida" className="ouput"></div>
        </div>
          <div className="container_inputs">
            <input type="text" placeholder="Username"  id="user-name" className="chat-input-username"></input>
            <input className="chat-input" 
            type="text"
            placeholder='Enter a message'
            onKeyDown={this.handleSubmit}
            />
    </div>*/}

            <div id="mySidebar" className="sidebar">
              <div className="titulo">
              <h2 style={{position: 'fixed'}}>Mensajeria</h2>
              <h5 style={{position: 'fixed',top:'50px'}} id="Usuarios"></h5>
                 <a  onclick={()=>this.closeNav()} className="closebtn">×</a>
              </div>

              <div id="chat-window" >
              <div id="msjs_div">
              <div id="salida">

              </div>
              <div id="actions"></div>
              
              </div>
              
              <div className="alert alert-danger alert-dismissible" id="alerts" style={{display: 'none'}}>
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <p id="text_alert"></p>
            </div>
            <input type="text" id="user-name" placeholder="Username"/>
            <input type="text" id="message" placeholder="Mesagge" onKeyDown={this.handleSubmit}/>
            <button id="send" className="btn-env">Enviar</button>

              </div>

            </div>

            <button class="openbtn" id="btn_open" onClick={()=>this.openNav()}> texto </button>
      </div>
      
    )
  }
}

//ReactDOM.render(<App/>, document.getElementById('root'));
