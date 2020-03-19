import React from 'react';
import Sketch from 'react-p5';
import io from 'socket.io-client';
import './board.sass'

export default class board extends React.Component {
  state = {
    x1: '',
    y1: '',
    x2: '',
    y2: '',
    x3:'',
    y3:'',
    color: 'black',
    size: 6,
    clickPress: false,
    mouseReleased:false,
    trazo: [],
    pageinit:false,
    clear:false,
    circle:false,
    rect:false,
    triangle:false,
    pencil:true,
    diameter:0
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
      x1: e.pmouseX, y1: e.pmouseY, x2: e.pmouseX, y2: e.pmouseY
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
    const socket = io(this.props.socketUrl, {
        query:
          { pin: this.props.id_access }
      })
    if(this.state.pencil){
      console.log(this.state.trazo)
      socket.emit('DrawPencil', {
        data: this.state.trazo
      })
      this.setState({
      clickPress: false,
      trazo:[]
      })
    }else if(this.state.circle){

      const d=this.state.x1-e.pmouseX
      const x1=this.state.x1-(d/2)
      const y1=this.state.y1-(d/2)
      const data={
        d:d,
        x1:x1,
        y1:y1
      }
      socket.emit('DrawCircle', {
        data: data
      })
      this.setState({
        clickPress: false,
        mouseReleased:true,
        diameter:d,
        x2:x1,
        y2:y1
      })
    }else if(this.state.rect){
      this.setState({
        clickPress: false,
        mouseReleased:true,
        x2:e.pmouseX-this.state.x1,
        y2:e.pmouseY-this.state.y1
      })
      const data={
        x1:this.state.x1,
        y1:this.state.y1,
        x2:e.pmouseX-this.state.x1,
        y2:e.pmouseY-this.state.y1
      }
      socket.emit('DrawRect', {
        data: data
      })
    }else if(this.state.triangle){
      
      const r=this.state.x1-e.pmouseX
      const x2=this.state.x1
      const y2=this.state.y1
      const x3=e.pmouseX
      const x1=this.state.x1+r
      const y1=e.pmouseY
      const y3=e.pmouseY

      const data={
        x1:x1,
        y1:y1,
        x2:x2,
        y2:y2,
        x3:x3,
        y3:y3
      }
      socket.emit('DrawTriangle', {
        data: data
      })

      this.setState({
        clickPress: false,
        mouseReleased:true,
        x1:x1,
        y1:y1,
        x2:x2,
        y2:y2,
        x3:x3,
        y3:y3
      })
    }else if(this.state.line){
      const data={
        x1:this.state.x1,
        y1:this.state.y1,
        x2:e.pmouseX,
        y2:e.pmouseY
      }
      socket.emit('DrawLine', {
        data: data
      })
      this.setState({
        clickPress: false,
        mouseReleased:true,
        x2:e.pmouseX,
        y2:e.pmouseY
      })
    }
  }
  // c: evento al mover el mouse precionando el click
  mouseDragged(e) {
    if(this.state.pencil){
      this.setState({
        x2: e.pmouseX, y2: e.pmouseY
      })
    }
  }
  // c: evento que realiza las acciones en el canvas
  draw = (p5) => {
    
    if (this.state.clickPress) {
      p5.fill('#be525200')
      p5.stroke(this.state.color);
      p5.strokeWeight(this.state.size)
      if(this.state.pencil){
      p5.line(this.state.x1, this.state.y1, this.state.x2, this.state.y2);
      
      this.state.trazo.push({
            x: this.state.x1,
            y: this.state.y1,
            x1: this.state.x2,
            y1: this.state.y2 
          })
      this.setState({
        x1: this.state.x2,
        y1: this.state.y2
      })
    }
    }else if(this.state.mouseReleased){ 
      if(this.state.circle){
        p5.circle(this.state.x2,this.state.y2,this.state.diameter);
        
      }else if(this.state.rect){
        p5.rect(this.state.x1,this.state.y1,this.state.x2,this.state.y2)
      }else if(this.state.triangle){
        p5.triangle(this.state.x1,this.state.y1,this.state.x2,this.state.y2,this.state.x3,this.state.y3)
      }else if(this.state.line){
        p5.line(this.state.x1,this.state.y1,this.state.x2,this.state.y2)
      }
      this.setState({
          mouseReleased:false
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
    this.setState({
      clear:true

    })
    const socket = io(this.props.socketUrl, {
      query:
        { pin: this.props.id_access }
    })
    socket.emit('clearBoard',{data:'aqui va la data'})
  }
  // c: Cambiar opcion a circulo
  circle=()=>{
    this.setState({
      circle:true,
      rect:false,
      triangle:false,
      pencil:false,
      mouseReleased:false
    })
  }
  // c: Cambiar opcion a rectangulo
  rect=()=>{
    this.setState({
      circle:false,
      rect:true,
      triangle:false,
      pencil:false,
      mouseReleased:false
    })
  }
  // c: Cambiar opcion a triangulo
  triangle=()=>{
    this.setState({
      circle:false,
      rect:false,
      triangle:true,
      pencil:false,
      mouseReleased:false
    })
  }
  // c: Cambiar opcion a lapiz
  pencil=()=>{
    this.setState({
      circle:false,
      rect:false,
      triangle:false,
      pencil:true,
      mouseReleased:false,
    })
  }
  line=()=>{
    this.setState({
      circle:false,
      rect:false,
      triangle:false,
      pencil:false,
      mouseReleased:false,
      line:true
    })
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
                <ul className='ulOptions'>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.clear()}>refresh</i>
                    </li>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.circle()}>panorama_fish_eye</i>
                    </li>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.rect()}>check_box_outline_blank</i>
                    </li>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.triangle()}>change_history</i>
                    </li>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.pencil()}>create</i>
                    </li>
                    <li className="iclear">
                      <i className="material-icons" onClick={()=>this.line()}>remove</i>
                    </li>
                </ul>
                
              </div>
              
          </li>
      </ul>
      </>
    );
  }
}