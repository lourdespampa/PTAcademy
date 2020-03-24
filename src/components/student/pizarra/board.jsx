import React from "react";
import Sketch from "react-p5";
import io from "socket.io-client";
export default class board extends React.Component {
  state={
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    x3:0,
    y3:0,
    d:0,
    color:'black',
    size:6,
    trazo:[],
    pageinit:false,
    circle:false,
    triangle:false,
    rect:false,
    line:false
  }
  // c: inicializacion retardada por 1 seg y recepcion de eventos por socket
  componentDidMount() {
      setTimeout(() => {
        this.setState({
          pageinit:true
        })
      }, 1000);
     const socket = io(this.props.socketUrl, {
        query:
            { pin: this.props.id_access }
      })
    socket.on('DrawPencil',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {

        console.log(data.data)
        console.log("------------------")
        this.setState({
          trazo:data.data
        })
      }
    })
    socket.on('DrawCircle',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {

        console.log(data.data)
        console.log("------------------")
        this.setState({
          x1:data.data.x1,
          y1:data.data.y1,
          d:data.data.d,
          circle:true
        })
      }
    })
    socket.on('DrawRect',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {

        console.log(data.data)
        console.log("------------------")
        this.setState({
          x1:data.data.x1,
          y1:data.data.y1,
          x2:data.data.x2,
          y2:data.data.y2,
          rect:true
        })
      }
    })
    socket.on('DrawTriangle',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {

        console.log(data.data)
        console.log("------------------")
        this.setState({
          x1:data.data.x1,
          y1:data.data.y1,
          x2:data.data.x2,
          y2:data.data.y2,
          x3:data.data.x3,
          y3:data.data.y3,
          triangle:true
        })
      }
    })
    socket.on('DrawLine',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {

        console.log(data.data)
        console.log("------------------")
        this.setState({
          x1:data.data.x1,
          y1:data.data.y1,
          x2:data.data.x2,
          y2:data.data.y2,
          line:true
        })
      }
    })
    socket.on('startPencil',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {
        this.setState({
          color:data.data.color,
          size:data.data.size
        })
      }
    })
    socket.on('clearBoard',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {
        this.setState({
          clear:true
        })
      }
    })
  }
  // c: evento que realiza las acciones en el canvas
  draw = p5 => {
    if(this.state.clear){
      p5.clear()
      this.setState({
        clear:false
      })
    }
    p5.fill('#be525200');
    p5.stroke(this.state.color);
    p5.strokeWeight(this.state.size);
    this.state.trazo.map(traz=>{
      p5.line(traz.x, traz.y, traz.x1, traz.y1);
    })
    if(this.state.circle){
      p5.circle(this.state.x1,this.state.y1,this.state.d)
      this.setState({
        circle:false
      })
    }else if(this.state.rect){
      p5.rect(this.state.x1,this.state.y1,this.state.x2,this.state.y2)
      this.setState({
        rect:false
      })
    }else if(this.state.triangle){
      p5.triangle(this.state.x1,this.state.y1,this.state.x2,this.state.y2,this.state.x3,this.state.y3)
      this.setState({
        triangle:false
      })
    }else if(this.state.line){
      p5.line(this.state.x1,this.state.y1,this.state.x2,this.state.y2)
      this.setState({
        line:false
      })
    }
  };
  render() {
    return (
      <div className='divSketch boardStudent'>
        {this.state.pageinit ? (
          <Sketch
            onclick
            
            className='canvasBoard'
            setup={(p5, parentRef) => {
              p5.createCanvas(1000, 500).parent(parentRef);
            }}
            draw={p5 => this.draw(p5)}
          />
        ) : null}
      </div>
    );
  }
}
