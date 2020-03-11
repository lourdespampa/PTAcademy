import React from "react";
import Sketch from "react-p5";
import io from "socket.io-client";
export default class board extends React.Component {
  state={
    x:0,
    y:0,
    x1:0,
    y1:0,
    color:'black',
    size:6,
    trazo:[],
    pageinit:false
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
    socket.on('startPencil',(data) => {
    if(data.pin === (this.props.id_access).toUpperCase()) {
        this.setState({
          color:data.data.color,
          size:data.data.size
        })
      }
    })
  }
  // c: evento que realiza las acciones en el canvas
  draw = p5 => {
    p5.stroke(this.state.color);
    p5.strokeWeight(this.state.size);
    this.state.trazo.map(traz=>{
      p5.line(traz.x, traz.y, traz.x1, traz.y1);
    })
  };
  render() {
    return (
      <div style={{ position: 'absolute',left: 'calc(50% - 500px)', top:'calc(50% - 250px)',width:'1000px' }}>
        {this.state.pageinit ? (
          <Sketch
            style={{ background: "gray", width: "1000px", height: "500px" }}
            onclick
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
