import React from 'react';
import './styles/text_code.css';
import '../App';


class Arduino extends React.Component {
  render() {
    return (<div className="container">
      <div className="comment">
        <textarea id="content_arduino" className="textinput" readOnly="readOnly" ></textarea>
      </div>
    </div>
    );
  }
}
export default Arduino;
