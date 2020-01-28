import React from 'react';
import './arduino.css';
import '../App';

class Arduino extends React.Component {

 render() {
    return ( <div class="container">
    <div class="comment">
    <textarea  id="content_arduino" className="textinput" readonly="readonly" ></textarea>
    </div>
</div>
    );
  }
}
export default Arduino;
