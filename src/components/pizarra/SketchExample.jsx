import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE,TOOL_ERASER } from './src';
//import './pizarra';
//import js from './pizarra.js';
//import IO from 'socket.io-client'



export default class SketchExample extends Component
{
  /*socket = null;
*/
  constructor(props) {
    super(props);

    this.state = {//propiedades por defecto
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  componentDidMount() {
//js.arrastrar();
    //wsClient.on('addItem', item => this.setState({items: this.state.items.concat([item])}));
    /*const div = document.getElementById('div_cont')
    const width = div.offsetWidth-(div.offsetWidth*0.1)
    const height = div.offsetHeight-(div.offsetHeight*0.1)

    const canvas = document.getElementById("canvas")
    canvas.width = width
    canvas.height = height

    */
    
    /*const btn_pencil = document.getElementById('btn_pencil')
    btn_pencil.addEventListener('focus',()=>{
      btn_pencil.style.background = 'red';
    })*/
    /*const btn_eraser = document.getElementsByTagName('button')
    btn_eraser.addEventListener('focus',()=>{
     // btn_eraser.style.background = 'red';
    })*/
  }

  limpiando(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    ctx.clearRect(0, 0, c.width, c.height);
  console.log(c.width);
  console.log(c.height)
    
    
  }


  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    return (
     
      <div className="container" id="div_cont" >
{/*Menu desplegable de pizarra*/}
        <div className="pizarra-menu" id="draggable">
        <ul className="menu">

<li title="Move"><a  id="btn" className="menu-button home">menu</a></li>

<li title="Pencil"><button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold',} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
              id='btn_pencil'
            ><i className="fas fa-pencil-alt"></i></button></li>

<li title="Eraser"><button
              style={tool == TOOL_ERASER ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ERASER  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ERASER})}
              id='btn_Eraser'
            ><i className="fas fa-eraser"></i></button></li>
<li title="Clean"><button onClick={()=>this.limpiando()}>
            <i class="far fa-trash-alt"></i>
            </button></li>
<li title="Line"><button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            ><i class="fas fa-slash"></i></button></li>
<li title="Circle"><button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            ><i class="far fa-circle"></i></button></li>
<li title="Square"><button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            ><i class="far fa-square"></i></button></li>
<li title="Size">Size:<input className="slider" min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} /></li>
<li title="Color"> <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} /></li>
            <li title="More">{(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span><br></br>
                  <label htmlFor="">with color:</label><br></br>
                  <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} ></input>
                </span> : ''}
            </div> : ''}</li>
</ul>
        </div>
        {/*FIN Menu desplegable de pizarra*/}
         {/*Inicio del canvas pizarra*/}
          <SketchPad //cambiar las propiedades del Sckethpad
            width={900}
            height={600}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
         //  onCompleteItem={(i) => wsClient.emit('addItem', i)}
          />
        
        <div >
          <div className="" style={{marginBottom:20, boder:"solid",borderColor:"blue"}}>
            {/*<button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold',} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
            >Pencil</button>*/}

            {/*<button
              style={tool == TOOL_ERASER ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ERASER  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ERASER})}
            >Eraser</button>*/}
            {/*<button onClick={()=>this.limpiando()}>
            <i class="far fa-trash-alt"></i>
          </button>*/}
            

            {/*<button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            >Line</button>*/}
            {/*<button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            >circle</button>*/}
            {/*<button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            ><i class="far fa-square"></i></button>*/}
          </div>
          {/*<div className="options" style={{marginBottom:20 ,border:"solid"} }>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>*/}
         {/* <div className="options" style={{marginBottom:20 ,border:"solid"}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
        </div>*/}
         
          {/*(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <label htmlFor="">with color:</label>
                  <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                </span> : ''}
              </div> : ''*/}
        </div>
      </div>
    );
  }
}
