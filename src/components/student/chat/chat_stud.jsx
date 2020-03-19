import 'react-chat-elements/dist/main.css';
import { MessageBox, ChatItem, Avatar, SpotifyMessage, Input,Button } from 'react-chat-elements';
import React, {Component} from 'react';
import io from 'socket.io-client';

export default class Test3 extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          socket:null,
          message: [],
          respuestaRecibida : false,
          textMessage:""
          
        }
      }
     socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
    componentDidMount(){
     

      this.socket.on('TeachWriting',(data) => {
        if(data.pin === (this.props.id_access).toUpperCase()) {
            //alert("Teacher escribiendo")
          }
        })
      
        this.socket.on('TeachSendMessage',(data)=>{
            if(data.pin === (this.props.id_access).toUpperCase()) {
                /*this.setState({
                    message: data.data
                  });*/
                  this.state.message.push(data.data)
                  this.setState({
                      respuestaRecibida : true,
                  })

                 // this.setState({message:""})
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
    handleChange = e => {
        const target = e.target;
        const value = target.value;
    
        this.setState({
          textMessage: value
        });
        //this.socket.emit('TeacherWrinting')
        //console.log(this.state.textMessage);
      };
    handleSubmit = ()=> {
        const data = {
            message : this.state.textMessage,
            name : this.props.name ,
            lastName : this.props.lastName
        }
        //const data = this.state.textMessage
        this.socket.emit('studentSendMessage',data)
      //  alert("env")
        this.state.message.push(data)
        this.refs.input.clear();
        
      }
    
    render(){
        return(
          <div>
              {/*
    this.state.respuestaRecibida
            ?
            <ChatItem
                avatar={'https://robohash.org/teneturinventorevero.bmp?size=50x50&set=set1'}
                alt={'Reactjs'}
                title={'Facebook'}
                subtitle={this.state.message}
                date={new Date()}
                unread={0} />
            :
            null
            
              */}
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
                      date={Date.now()}
                      />
                  })
              }
              <Input
                placeholder="Type here..."
                multiline={false}
                onChange={this.handleChange}
                autofocus={true}
                ref="input"
                rightButtons={
                  <Button
                  color='white'
                  backgroundColor='black'
                  text='Send'
                  onClick={this.handleSubmit}
                  />
            
                }
              />
          </div>
        )
    }



}
