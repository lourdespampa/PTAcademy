import React from 'react';
import Sketch from 'react-p5';
import io from 'socket.io-client';
import './board.sass'

export default class board extends React.Component {
  state = {
    x: '',
    y: '',
    x1: '',
    y1: '',
    color: 'black',
    size: 6,
    clickPress: false,
    trazo: [],
    pageinit:false,
    clear:false
  }
  // c: inicializacion retardada por 1 segundo para evitar bugs
  componentDidMount() {
    setTimeout(() => {
      this.setState({
      pageinit:true
    }) 
    }, 1000); 
  }
  // c: evento que se realiza al precionar el click
  mousePressed(e) {
    this.setState({
      clickPress: true,
      x: e.pmouseX, y: e.pmouseY, x1: e.pmouseX, y1: e.pmouseY
    })
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    var data={
      color:this.state.color,
      size:this.state.size
    }
    socket.emit('startPencil', {
      data: data
    })
  }
  // c: evento que se realiza al dejar de precionar el click
  mouseReleased(e) {
      console.log(this.state.trazo)
      const socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
      socket.emit('DrawPencil', {
        data: this.state.trazo
      })
      this.setState({
      clickPress: false,
      trazo:[]
    })
  }
  // c: evento al mover el mouse precionando el click
  mouseDragged(e) {
    this.setState({
      x1: e.pmouseX, y1: e.pmouseY
    })
  }
  // c: evento que realiza las acciones en el canvas
  draw = (p5) => {
    if (this.state.clickPress) {
      p5.stroke(this.state.color);
      p5.strokeWeight(this.state.size)
      p5.line(this.state.x, this.state.y, this.state.x1, this.state.y1);
      
      this.state.trazo.push({
            x: this.state.x,
            y: this.state.y,
            x1: this.state.x1,
            y1: this.state.y1 
          })
      this.setState({
        x: this.state.x1,
        y: this.state.y1
      })
    }else if(this.state.clear){
      p5.clear()
      this.setState({
        clear:false
      })
    }
  }
  // c: opteniendo color seleccionado (negro por default)
  getColor=(e)=>{
    var color=e.target.id
    this.setState({
      color: color
    })
  }
  // c: opteniendo tamaño seleccionado (6 por default)
  getSize=(e)=>{
    this.setState({
      size:e.target.id
    })
  }
  // c: limpiar pizarra
  clear=()=>{
    this.setState({clear:true})
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    socket.emit('clearBoard')
  }
  render() {
    return (
      <>
      <div className='divSketch'>
        {this.state.pageinit ? 
        <Sketch
          onclick
          mouseWheel={()=>{return false},false}
          className='canvasBoard'
          setup={(p5, parentRef) => {
            p5.createCanvas(1000, 500).parent(parentRef);
          }}
          draw={(p5) => this.draw(p5)}
          mouseDragged={e => this.mouseDragged(e)}
          mousePressed={e => this.mousePressed(e)}
          touchStarted={e => this.mousePressed(e)}
          mouseReleased={e => this.mouseReleased(e)}
        /> 
        : null}
      </div>
      <ul className='divPalette'>
          <li className='liPalette liColor' >
              <div className='divCuadro contColor'>
                COLORES
                <ul className='ulcolors'>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='white' className='white'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='silver' className='silver'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='gray' className='gray'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='black' className='black'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='red' className='red'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='maroon' className='maroon'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='yellow' className='yellow'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='olive' className='olive'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='lime' className='lime'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='green' className='green'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='aqua' className='aqua'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='teal' className='teal'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='blue' className='blue'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='navy' className='navy'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='fuchsia' className='fuchsia'></div></li>
                  <li><div type='button' onClick={(e)=>this.getColor(e)} id='purple' className='purple'></div></li>
                </ul>
              </div>
          </li>
          <li className='liPalette liSize'>
              <div className='divCuadro contSize'>
                TAMAÑO
                <ul className='ulSize'>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-4' id='4'></div></li>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-8' id='8'></div></li>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-12' id='12'></div></li>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-16' id='16'></div></li>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-20' id='20'></div></li>
                  <li><div onClick={(e)=>this.getSize(e)} className='size-24' id='24'></div></li>
                </ul>
              </div>
          </li>
          <li className='liPalette liClear'>
              <div className='divCuadro contSize'>
                <ul className='ulSize'>
                    <div className="iclear">
                      <i className="material-icons" onClick={()=>this.clear()}>refresh</i>
                    </div>
                </ul>
                
              </div>
              
          </li>
      </ul>
      </>
    );
  }
}