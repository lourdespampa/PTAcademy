import React from 'react';
import ReactPaint from 'react-paint';

export default function board2() {
    const props = {
  style: {
    background: 'tomato',
    /* Arbitrary css styles */
  },
  brushCol: '#ffffff',
  lineWidth: 10,
  className: 'react-paint',
  height: 500,
  width: 500,
  onDraw: () => { console.log('i have drawn!'); },
};

const App = () => <ReactPaint {...props} />;
    return (
        <div>
            <App></App>
        </div>
    )
}
