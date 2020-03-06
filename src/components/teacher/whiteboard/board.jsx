import React, { Component, PropTypes } from 'react';

export default class ReactPaint extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  //   style: PropTypes.object.isRequired,
  //   height: PropTypes.number,
  //   width: PropTypes.number,
  //   brushCol: PropTypes.string,
  //   lineWidth: PropTypes.number,
  //   onDraw: PropTypes.func,
  // };
  // static defaultProps = {
  //   className: 'react-paint',
  //   style: {},
  //   height: 500,
  //   width: 500,
  //   brushCol: '#ff6347',
  //   lineWidth: 10,
  //   onDraw: () => {},
  // };

  constructor(...props) {
    super(...props);
    this.state = {
      mouseDown: false,
      mouseLoc: [0, 0],
      context:false,
      bb:false  
      };
  }

  componentDidMount() {
    const { brushCol, lineWidth } = this.props;
    var canvas=document.getElementById('canvasid')
    var context = canvas.getContext('2d');
    
    context.lineWidth = lineWidth;
    context.strokeStyle = brushCol;
    context.lineJoin = context.lineCap = 'round';

    var bb = document.getElementById('canvasid').getBoundingClientRect();
    this.setState({
      context:context,
      bb:bb
    })
  }

  componentWillUpdate(nextProps) {
    const { brushCol, lineWidth } = this.props;

    if (
      brushCol !== nextProps.brushCol ||
      lineWidth !== nextProps.lineWidth
    ) {
      this.state.context.lineWidth = nextProps.lineWidth;
      this.state.context.strokeStyle = nextProps.brushCol;
    }
  }

  mouseDown = e => {
    if (!this.state.mouseDown) this.setState({ mouseDown: true });

    this.setState({
      mouseLoc: [e.pageX || e.touches[0].pageX, e.pageY || e.touches[0].pageY],
    });

    this.state.context.moveTo(
      (e.pageX || e.touches[0].pageX) - this.bb.left,
      (e.pageY || e.touches[0].pageY) - this.bb.top
    );
  }

  mouseUp = () => (this.setState({ mouseDown: false }));

  mouseMove = e => {
    if (this.state.mouseDown) {
      // prevent IOS scroll when drawing
      if (e.touches) e.preventDefault();

      if (
        (e.pageX || e.touches[0].pageX) > 0 &&
        (e.pageY || e.touches[0].pageY) < this.props.height
      ) {
        this.state.context.lineTo(
          ((e.pageX || e.touches[0].pageX) - this.bb.left),
          ((e.pageY || e.touches[0].pageY) - this.bb.top)
        );

        this.state.context.stroke();
      }
    }
  }

  render() {
    const {
      width,
      height,
      onDraw,
      style,
      className,
    } = this.props;

    return (
      <div className={className}>
        <canvas id="canvasid"
          ref={c => (this.canvas = c)}
          className={`${className}__canvas`}

          width={width}
          height={height}

          onClick={onDraw}

          style={
            Object.assign({}, style, {
              width: 500,
              height: 500,
            })
          }

          onMouseDown={this.mouseDown}
          onTouchStart={this.mouseDown}

          onMouseUp={this.mouseUp}
          onTouchEnd={this.mouseUp}

          onMouseMove={this.mouseMove}
          onTouchMove={this.mouseMove}
        />
      </div>
    );
  }
}


export { ReactPaint };