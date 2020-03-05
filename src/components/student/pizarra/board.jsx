import React from "react";
import Sketch from "react-p5";
import io from "socket.io-client";
// import './styles.css';
let sket = false;
export default class board extends React.Component {
  state={
    x:0,
    y:0,
    x1:0,
    y1:0,
    color:'',
    size:1
  }
  componentDidMount() {
    sket = true;
     const socket = io(this.props.socketUrl, {
        query:
            { pin: this.props.id_access }
      })
      socket.on('startPencil',(data)=>{
        console.log(data)
        this.setState({
          color:data.data.color,
          size:data.data.size,
          x: data.data.lines.x,
          y: data.data.lines.y,
          x1: data.data.lines.x1,
          y1: data.data.lines.y1
        })
      })
    socket.on('DrawPencil',(data) => {
        // console.log(data)
        // console.log(data.data.color)
        // console.log(data.data.size)
        console.log(data.data.x1,data.data.y1)
        console.log("------------------")
        // console.log(data.data.lines.x1)
        // console.log(data.data.lines.y1)
    // const pinTeacher = this.pin.toUpperCase();
    // if(data.pin === (pinTeacher).toUpperCase()) {
        this.setState({
          x1: data.data.x1,
          y1: data.data.y1
        })
    // }
    })
  }
  draw = p5 => {
    p5.stroke(this.state.color);
    p5.strokeWeight(this.state.size);
    p5.line(this.state.x, this.state.y, this.state.x1, this.state.y1);
    this.setState ({
      x:this.state.x1,
      y:this.state.y1
    })
    // console.log(this.state.x, this.state.y, this.state.x1, this.state.y1)
  };
  render() {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        {sket ? (
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
