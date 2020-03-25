import 'react-chat-elements/dist/main.css';
import { ChatItem,Input,Button } from 'react-chat-elements';
import React, {Component} from 'react';
import io from 'socket.io-client';
import '../../teacher/chat/chat_teacher.css'
import ReactDOM from 'react-dom';
export default class Chat extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
          message: [],
          respuestaRecibida : false,
          textMessage:"",
          name : "",
          lastName :""      
        }
      }
     socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
     
    componentDidMount(){
    /*  setTimeout(() => {
        const name = localStorage.getItem("name")
        const lastName = localStorage.getItem("lastName")
        this.setState({
          name: name,
          lastName : lastName
        })     
      

      console.log(name);
      console.log(lastName);
      }, 4000);    */ 

      this.socket.on('TeachWriting',(data) => {
        if(data.pin === (this.props.id_access).toUpperCase()) {
            //alert("Teacher escribiendo")
          }
        })      
        this.socket.on('TeachSendMessage',(data)=>{
            if(data.pin === (this.props.id_access).toUpperCase()) {
                  this.state.message.push(data.data)
                  this.setState({
                      respuestaRecibida : true,
                  })
              }
        })

        this.socket.on('otherStudSendMessage',(data)=>{
          if(data.pin === (this.props.id_access).toUpperCase()) {
            this.state.message.push(data.data)
            this.setState({
              respuestaRecibida : true,
          })          
          }
        })
      
    } 
    componentDidUpdate() {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
        }
        
    }
    componentWillUpdate(){
      const { messageList } = this.refs;
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);

    }
    scrollToBottom = () => {
      const { messageList } = this.refs;
      const scrollHeight = messageList.scrollHeight;
      const height = messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }
    
    openChat = ()=>{
      document.getElementById('myForm').style.display = 'block'
    }
    closeChat = ()=>{      
      document.getElementById('myForm').style.display = 'none'
    }
    handleChange = e => {
        const target = e.target;
        const value = target.value;
    
        this.setState({
          textMessage: value
        });
      };
    handleSubmit = ()=> {
      if(this.state.textMessage.length>0){
        
        const data = {
          message : this.state.textMessage,
         /* name : this.props.name,
          lastName : this.props.lastName
          el props dejo de funcionar no se porque 
          */
          name : localStorage.getItem("name"),
          lastName : localStorage.getItem("lastName")
      }
      this.socket.emit('studentSendMessage',data)
      this.state.message.push(data)
      this.refs.input.clear();
      }    
      }
      handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.handleSubmit()
        }
      }   
    
    render(){
        return(
          <>
               <div className="chat-popup" id="myForm">
  <div className="chat_form-container">
    <h1>Chat</h1>

  <div className="chat-messages-container" ref="messageList" id="div_chat_container">
              {
                  this.state.message.map(message =>{
                    if (message.sendByTeacher==true) {
                      return <ChatItem
                      avatar={'https://image.flaticon.com/icons/svg/1089/1089129.svg'}
                      alt={'Reactjs'}
                      title={message.name+" "+message.lastName}
                      subtitle={message.message}
                      date={new Date()}
                      statusColor="green"
                      />
                      
                    }
                      return <ChatItem
                      avatar={'https://image.flaticon.com/icons/svg/1651/1651639.svg'}
                      alt={'Reactjs'}
                      title={message.name+" "+message.lastName}
                      subtitle={message.message}
                      date={new Date()}
                      />
                  })
              }
              </div>
              <Input
                placeholder="Type here..."
                multiline={false}
                onChange={this.handleChange}
                autofocus={true}
                ref="input"
                onKeyPress={this.handleKeyPress}
                onMaxLengthExceed={()=>{alert("Limite de caracteres alcanzado")}}
                rightButtons={
                  <Button
                  color='white'
                  backgroundColor='black'
                  text='Send'
                  onClick={this.handleSubmit}
                  />
            
                }
              />
                  <button type="button" className="chat_btn chat_cancel" onClick={this.closeChat}>Close</button>
          </div>
        </div>
              <button className="chat_open-button" onClick={this.openChat}>CHAT  </button>
          </>
        )
    }



}
