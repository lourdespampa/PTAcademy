import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './Roulette.css';

class Roulette extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intervalId: "",
      spinAngleStart: 0,
      startAngle: 0,
      spinTime: 0,
      responsiveSize: 0,
      arc: Math.PI / (props.options.length / 2),
    }
    this.spinTimer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.spin = this.spin.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    baseSize: PropTypes.number,
    spinAngleStart: PropTypes.number,
    spinTimeTotal: PropTypes.number,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    options:  ['item1', 'item2', 'item3', 'item4', 'item5'],
    baseSize: 275,
    spinAngleStart: Math.random() * 10 + 10,
    spinTimeTotal: Math.random() * 3 + 4 * 1000,
  };

  componentDidMount() {
    this.drawRouletteWheel();
  }

  byte2Hex(n) {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  RGB2Color(r,g,b) {
  	return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 128;
    const frequency = Math.PI*2/maxitem;

    const red   = Math.sin(frequency*item+2+phase) * width + center;
    const green = Math.sin(frequency*item+0+phase) * width + center;
    const blue  = Math.sin(frequency*item+4+phase) * width + center;

    return this.RGB2Color(red,green,blue);
  }

  drawRouletteWheel() {
    const { options, baseSize } = this.props;
    let { startAngle, arc } = this.state;


    // const spinTimeout = null;
    // const spinTime = 0;
    // const spinTimeTotal = 0;

    let ctx;
    let outsideRadius, textRadius;

    const canvas = this.refs.canvas;
    if (canvas.getContext) {
      if(window.screen.width <= 360){}
      outsideRadius = baseSize - 25;
      textRadius = baseSize - 45;
      //tamaño de tringulitos
      const insideRadius = baseSize - 210;

      ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,600,600);

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      ctx.font = '14px Helvetica, Arial';

      for(let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;

        ctx.fillStyle = this.getColor(i, options.length);

        ctx.beginPath();
        ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
        ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius,
                      baseSize + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = `${options[i].toUpperCase().split(" ")[0].split("")[0]}.${options[i].toUpperCase().split(" ")[1].split("")[0]}`;
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
      ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
      ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
      ctx.fill();
      ctx.stroke();
    }
  }

  spin() {
    this.spinTimer = null;
    this.setState({ spinTime: 0}, () => this.rotate());
  }

  rotate(){
    const { spinAngleStart, spinTimeTotal } = this.props;
    if(this.state.spinTime > 3800) {
      clearTimeout(this.spinTimer);
      this.stopRotateWheel();
    } else {
      const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, spinTimeTotal);
      this.setState({
        startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
        spinTime: this.state.spinTime + 30,
      }, () => {
        this.drawRouletteWheel();
        clearTimeout(this.spinTimer);
        this.spinTimer = setTimeout(() => this.rotate(), 30);
      })
    }
  }

  stopRotateWheel() {
    let { startAngle, arc } = this.state;
    const { options, baseSize } = this.props;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 20px Helvetica, Arial';
    const text = options[index];
    //Roulette
    
    const socket = io(this.props.socketUrl, {
      query:
          { pin: this.props.id_access }
    })
    
    socket.emit('azarprofe',text)
    console.log('emite el profe')
    //Roulette END
    // ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, baseSize / 3);
    ctx.restore();
    this.props.onComplete(text);
  }


  easeOut(t, b, c, d) {
    const ts = (t/=d)*t;
    const tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  handleOnClick = (e) => {
    document.getElementById("btnRuleta").setAttribute("disabled", "")
    let pulsadas = Math.round(Math.random()*10)
    console.log(pulsadas)
    let intervalId = setInterval(() => this.spin(), 100)
    this.setState({intervalId: intervalId})
    setTimeout( () => {
      clearInterval(this.state.intervalId)
      document.getElementById("btnRuleta").removeAttribute("disabled")
    }, pulsadas*1000)
  }

  render() {
    const { baseSize } = this.props;

    return (
      <div className="roulette">
        <div className="roulette-container">
          <canvas ref="canvas" className="roulette-canvas" width={baseSize*2} height={baseSize*2}></canvas>
        </div>
        <div className="roulette-container">
          <button className="roulette-container-button" onClick={this.handleOnClick} id="btnRuleta">
            <div className="button-zoom">GIRAR</div>
          </button>
        </div>
      </div>
    );
  }
}

export default Roulette;
