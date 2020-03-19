import 'react-chat-elements/dist/main.css';
import {ChatItem, Input,Button } from 'react-chat-elements';
import React, {Component} from 'react';
import io from 'socket.io-client';

export default class Chat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          socket:null,
          message: [],
          respuestaRecibida : false,
          textMessage:"",
          messageList: [],
          name_teacher:"",
          lastName_teacher:""
          
        }
      }
     socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
    componentDidMount(){
      
      this.setState({name_teacher:localStorage.getItem("name_teacher"),lastName_teacher:localStorage.getItem("lastName_teacher")})

      this.socket.on('studWriting',(data) => {
        if(data.pin === (this.props.id_access).toUpperCase()) {
            //alert("Teacher escribiendo")
          }
        })
      
        this.socket.on('studSendMessage',(data)=>{
            if(data.pin === (this.props.id_access).toUpperCase()) {
                /*this.setState({
                    message: data.data
                  });*/
                  this.state.message.push(data)
                  this.setState({
                      respuestaRecibida : true,
                  })

                 // this.setState({message:""})
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
            name : this.state.name_teacher ,
            lastName : this.state.lastName_teacher,
            sendByTeacher : true
        }
        //const data = this.state.textMessage
        this.socket.emit('teacherSendMessage',data)
      //  alert("env")
        this.state.message.push(data)
        this.refs.input.clear();
        
      }      
    render(){
        return(
          <div >
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
            https://image.flaticon.com/icons/svg/1089/1089129.svg
            https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=BlondeGolden&facialHairType=BeardLight&facialHairColor=Brown&clotheType=BlazerSweater&eyeType=Default&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Yellow
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
                      date={new Date()}
                      />
                  })
              }              
              <Input
                placeholder="Type here..."
                multiline={true}
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
