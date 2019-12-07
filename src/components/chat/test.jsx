import React, {Component} from 'react';
import './test_2.css';
import $ from 'jquery';
//import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import io from 'socket.io-client';
const socketUrl="http://localhost:4000";
export default class Test extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          socket:null,
          messages: []
          
        }
      }
       openPage(pageName,elmnt,color) {
        // alert("hola")
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(pageName).style.display = "block";
        elmnt.style.backgroundColor = color;
      }
    componentDidMount(){
    function openPage(pageName,elmnt,color) {
       // alert("hola")
       var i, tabcontent, tablinks;
       tabcontent = document.getElementsByClassName("tabcontent");
       for (i = 0; i < tabcontent.length; i++) {
         tabcontent[i].style.display = "none";
       }
       tablinks = document.getElementsByClassName("tablink");
       for (i = 0; i < tablinks.length; i++) {
         tablinks[i].style.backgroundColor = "";
       }
       document.getElementById(pageName).style.display = "block";
       elmnt.style.backgroundColor = color;
     }

     const btn_home_test = document.getElementById('btn_home_test')
      
     btn_home_test.addEventListener('click',openPage('Home',btn_home_test, 'red'))
      // Get the element with id="defaultOpen" and click on it
     // document.getElementById("defaultOpen").click();
       //INICIO Desplazamiento del chat
        var nav = document.getElementById('nav');
        var icono = document.getElementById('icono');
        var div = document.getElementById('div_chat');
        var div_head = document.getElementById('div_head');
        var div_foot = document.getElementById('div_foot');
        var div_child = document.getElementById('div_children');
        var arr = [];
        icono.addEventListener('click',()=>{
         
          if(arr.length%2==0){
            nav.style.height = '100vh';
            nav.style.top = 0;
            nav.style.width = '350px';
            div.style.display = 'block';            
            div_child.style.marginRight = "350px";
            div_head.style.marginRight = "350px";
            div_foot.style.marginRight = "350px";
            arr.push("hola");
            
          }else{
            nav.style.height = '15vh';
            nav.style.top = '40%';
            nav.style.width = '50px';
            div.style.display = 'none';
            div_child.style.marginRight = "0px";
            div_head.style.marginRight = "0px";
            div_foot.style.marginRight = "0px";
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
        //FIN FUNCIONAMIENTO DEL CHAT
    


    render(){
        return(
        <div>
          <nav className="nav__cont" id="nav">
            <ul className="nav">  
              <li className="nav__items ">
              <i className="fas fa-comments" id="icono"></i>
              </li>
              <button className="tablink" onclick={()=>this.openPage('Home', this, 'red')} id="btn_home_test">Home</button>
<button className="tablink" onclick={()=> this.openPage('News', this, 'green')} id="defaultOpen">News</button>
<button className="tablink" onclick={()=>this.openPage('Contact', this, 'blue')}>Contact</button>
<button className="tablink" onclick={()=>this.openPage('About', this, 'orange')}>About</button>

<div id="Home" className="tabcontent">
<div className="div_chat" id="div_chat">
              asdasd
          <div className="chat">
            <div className="chat-title">
              <h1>Fabio Ottaviani</h1>
              <h2>Supah</h2>
              <figure className="avatar">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>
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
</div>

<div id="News" className="tabcontent">
  <h3>News</h3>
  <p>Some news this fine day!</p> 
</div>

<div id="Contact" className="tabcontent">
  <h3>Contact</h3>
  <p>Get in touch, or swing by for a cup of coffee.</p>
</div>

<div id="About" className="tabcontent">
  <h3>About</h3>
  <p>Who we are and what we do.</p>
</div>
            
            
            
            
            
    </ul>
    </nav>
</div>
          
        )
    }



}