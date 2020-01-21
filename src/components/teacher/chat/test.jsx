import React, {Component} from 'react';
import './test_2.css';
// import $ from 'jquery';
//import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import io from 'socket.io-client';
const socketUrl="http://3.16.110.136:4000/teacher";
export default class Test extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          socket:null,
          messages: []
          
        }
      }
     
    componentDidMount(){
  //INICIO FUNCIONAMIENTO DEL TAB
      


  //FIN TAB
     // document.getElementById("defaultOpen").click();
       //INICIO Desplazamiento del chat
        var nav = document.getElementById('nav');
        var icono = document.getElementById('icono');
        var div = document.getElementById('div_chat');
        // var div_head = document.getElementById('div_head');
        var div_foot = document.getElementById('div_foot');
        // var div_tab = document.getElementById('div_tab');
        var div_child = document.getElementById('div_children');
        var arr = [];
        icono.addEventListener('click',()=>{
         
          if(arr.length%2===0){
            nav.style.height = '100vh';
            nav.style.top = 0;
            nav.style.width = '350px';
            div.style.display = 'block';            
            div_child.style.marginRight = "350px";
            // div_head.style.marginRight = "350px";
            div_foot.style.marginRight = "350px";
          //  div_tab.style.display = 'block';
            arr.push("hola");
            
          }else{
            nav.style.height = '15vh';
            nav.style.top = '40%';
            nav.style.width = '50px';
            div.style.display = 'none';
            div_child.style.marginRight = "0px";
            // div_head.style.marginRight = "0px";
            div_foot.style.marginRight = "0px";
           // div_tab.style.display = 'none'
            arr.push("hola");    
          }
        })
        //FIN Desplazamiento del chat
        //INICIO FUNCIONAMIENTO DEL CHAT
        this.socket = io(socketUrl)
        
        this.socket.on('message', message => {
         
        
             // act.innerHTML = "";
         
           /*   salida.innerHTML += `<p>
              <strong>${message.from}</strong> : ${message.body}
              <p>`
            </p> messageBody.scrollTop = (messageBody.clientHeight - messageBody.scrollHeight)*-1;
             */
            })
        this.socket.on('actions', message => {
      
       // act.innerHTML =message.username + message.msj
        })
    }    
        handleSubmit = event => {
            // username.value();
            const username_input = document.getElementById('user-name');
            const username = username_input.value;
            const salida = document.getElementById('salida');
            if(username ===""){
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
                  if(event.target.value===""){
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
        //FIN FUNCIONAMIENTO DEL CHAT
    


    render(){
        return(
        <div>
          <nav className="nav__cont" id="nav">
            <ul className="nav">  
              <li className="nav__items ">
              <i className="fas fa-comments" id="icono"></i>
              </li>


                   
                      
              <div className="div_chat" id="div_chat">
              
              <div className="chat">
                <div className="chat-title">
                  <h1>SALA DE CHAT</h1>
                
                </div>
                <div className="messages">
                  <div className="messages-content"></div>
                </div>
                <div className="message-box">
                    <input type="text" placeholder="Username" id="user-name"></input>
                  <textarea type="text" className="message-input" placeholder="Type message..." onKeyDown={this.handleSubmit}></textarea>
                  <button type="submit" className="message-submit">Send</button>
                </div>
              
              </div>
              <div className="bg"></div>
            </div>
                       
            
    </ul>
    </nav>
</div>
          
        )
    }



}