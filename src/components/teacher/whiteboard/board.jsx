import React from 'react';
import Sketch from 'react-p5';
// import './styles.css';

export default class board extends React.Component {
 state={
   x:'',
   y:'',
   x1:'',
   y1:'',
   color:'black',
   size:10
 }
 mousePressed(e){
  this.setState({
    x:e.pmouseX,y:e.pmouseY,x1:e.pmouseX,y1:e.pmouseY
  })
 }
 mouseDragged(e){
  console.log('tocuchStart x', e.pmouseX)
  console.log('tocuchStart y', e.pmouseY)
  this.setState({
    x1:e.pmouseX,y1:e.pmouseY
  })
}
draw(p5){
  p5.stroke(this.state.color);
  p5.strokeWeight (this.state.size)
  p5.line(this.state.x, this.state.y, this.state.x1, this.state.y1);
  this.setState({
    x:this.state.x1,y:this.state.y1
  })
}
	render() {
		return (
			<div >
				<Sketch
          style={{background:'gray',width:'1000px',height:'500px'}}
					onclick
					setup={(p5, parentRef) => {
						p5.createCanvas(1000, 500).parent(parentRef);
					}}
					draw={p5 =>this.draw(p5)}
          mouseDragged={e=>this.mouseDragged(e)}
          mousePressed={e=>this.mousePressed(e)}
          touchStarted={e=>this.mousePressed(e)}
				/>
			</div>
		);
	}
}