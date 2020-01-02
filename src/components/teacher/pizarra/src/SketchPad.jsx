import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE,Eraser,TOOL_ERASER } from './tools'

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_ERASER]: Eraser,
  
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse
};
/*const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')*/
export default class SketchPad extends Component {

  tool = null;
  interval = null;

  /*static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
    onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
    onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
    onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
    debounceTime: PropTypes.number,
  };*/

  static defaultProps = {
    width: 1500,
    height: 900,
    color: '#000',
    size: 5,
    fillColor: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap
  };

  constructor(props) {
    super(props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  
  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    const canvas1 = document.getElementById('canvas')
    this.initTool(this.props.tool);
  //  canvas1.width = 640;
    //canvas1.height = 1136;
    canvas1.addEventListener('touchstart', function(e){
      console.log(e)
    /*draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    draw(e.changedTouches[1].pageX, e.changedTouches[1].pageY);*/
    });
    
    canvas1.addEventListener('touchmove', function(e){
      e.preventDefault();
    /*draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    draw(e.changedTouches[1].pageX, e.changedTouches[1].pageY);*/
    });
    
    

    /*draw = function(x, y){
      canvas.beginPath();
      canvas.fillStyle = '#ff8330';
      canvas.arc(x, y, 10, 0, 200 * Math.PI);
      canvas.fill();
      canvas.closePath();
    };*/
    
 


  }

  componentWillReceiveProps({tool, items}) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }


  onMouseDown(e) {//CUANDO EL HACES CLICK EN EL CANVAS
   //alert("down")
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }
  }

  onDebouncedMove() {

    if (typeof this.tool.onDebouncedMouseMove == 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  } 

  onMouseMove(e) {//mouse moviendose dentro del canvas

    //var imageData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
    document.getElementById('canvas').style.cursor = "crosshair";  //cambiar el Mouse

   // console.log("move");
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);

  }
  onTouchMove2(e) {//mouse moviendose dentro del canvas

    //var imageData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
   // document.getElementById('canvas').style.cursor = "crosshair";  //cambiar el Mouse

   // console.log("move");
    const data = this.tool.onTouchMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);

  }

  
  onMouseUp(e) {//Cuando el mouse sale del canvas
   

    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    
    return [
      e.clientX - left,
      e.clientY - top
    ];
    
  }

  onTouchStart(e){
  
      //e.preventDefault();
      this.draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      this.draw(e.changedTouches[1].pageX, e.changedTouches[1].pageY);
    console.log("touch START")
    
  }

  onTouchEnd(e){
   
     // e.preventDefault();
    
    //var imageData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
   
  }

  onTouchMove(e){
   
      e.preventDefault();
      this.draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      this.draw(e.changedTouches[1].pageX, e.changedTouches[1].pageY);
    console.log("touch MOVE")
  }

  render() {
    const {width, height, canvasClassName,color} = this.props;
    return (
    
      <canvas id="canvas"
      
        ref={(canvas) => { this.canvasRef = canvas; }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        //onTouchStart={this.onTouchStart}
        //onTouchMoveCapture={this.onTouchMoveCapture}
        onTouchMove={this.onTouchMove2}
       // onTouchEnd={this.onTouchEnd}
       // limpiar={this.limpiar}
        width={width}
        height={height}
        color ={color}

      />
     
    )
  }
}
