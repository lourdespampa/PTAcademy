import React from 'react';
import Sketch from 'react-p5';
import io from 'socket.io-client';
// import './styles.css';
let l = false
export default class board extends React.Component {
  state = {
    x: '',
    y: '',
    x1: '',
    y1: '',
    color: 'black',
    size: 10,
    clickPress: false
  }
  componentDidMount() {
    l = true
  }
  mousePressed(e) {
    this.setState({
      clickPress: true,
      x: e.pmouseX, y: e.pmouseY, x1: e.pmouseX, y1: e.pmouseY
    })
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    var data = {
      color: this.state.color,
      size: this.state.size,
      lines: { x: e.pmouseX, y: e.pmouseY, x1: e.pmouseX, y1: e.pmouseY }
    }
    socket.emit('startPencil', {
      data: data
    })
  }
  mouseReleased(e) {
    this.setState({
      clickPress: false
    })
  }
  mouseDragged(e) {
    console.log('tocuchStart x', e.pmouseX)
    console.log('tocuchStart y', e.pmouseY)
    this.setState({
      x1: e.pmouseX, y1: e.pmouseY
    })
  }
  draw = (p5) => {
    if (this.state.clickPress) {
      p5.stroke(this.state.color);
      p5.strokeWeight(this.state.size)
      p5.line(this.state.x, this.state.y, this.state.x1, this.state.y1);
      this.setState({
        x: this.state.x1,
        y: this.state.y1
      })

      const socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
      var data = {
        x: this.state.x, y: this.state.y, x1: this.state.x1, y1: this.state.y1
      }
      socket.emit('DrawPencil', {
        data: data
      })
    }
  }
  render() {


    return (
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        {l ? <Sketch
          style={{ background: 'gray', width: '1000px', height: '500px' }}
          onclick
          setup={(p5, parentRef) => {
            p5.createCanvas(1000, 500).parent(parentRef);
          }}
          draw={(p5) => this.draw(p5)}
          mouseDragged={e => this.mouseDragged(e)}
          mousePressed={e => this.mousePressed(e)}
          touchStarted={e => this.mousePressed(e)}
          mouseReleased={e => this.mouseReleased(e)}
        /> : null}
      </div>
    );
  }
}