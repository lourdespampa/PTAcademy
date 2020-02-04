import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import io from 'socket.io-client';
import axios from "axios";
let styles = {
  margin: "auto",
  width: "100%",
  position: 'absolute',
  top:"0",
  left:"0",
  bottom:"0",
  rigth:"0"
};

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            Slides : [],
            iframeon:false,
            src:"",
            positionPpt: 1}
    }

     componentDidMount(){
      let varToken = localStorage.getItem('token')
        axios({
            url : `${this.props.apiUrl}/v1/api/teacher/presentations/${this.props.id_class}`,
            method : 'GET',
            headers:{                
                "x-access-token" :`${varToken}`
              }
        }).then((response) => {
          console.log(response.data)
          if(response.data.presentationIframe){
            this.setState({iframeon:true,src:response.data.presentationIframe})
            this.getUrl()
          }else{
            console.log(response.data);
            this.setState({Slides:response.data})
          }
        }).catch((err)=>{
              console.log(err)
      })
    }
    getUrl=()=> {
      var old = this.state.src;
      var casi = old.replace("pub", "embed");
      var enlace = casi.replace("delayms=3000", "delayms=3000&rm=minimal&slide=id.p"+this.state.positionPpt);
      console.log('get URL: ' + enlace)
      document.getElementById("diapo-frame").src = enlace;
      // document.getElementById("diminute").src = enlace;
  }
  

nextPpt=async()=> {
  
  await this.setState({
    positionPpt:this.state.positionPpt + 1
  })
  await this.getUrl()
  const socket = io(this.props.socketUrl, {
    query:
        { pin: this.props.id_access }
  })
  await socket.emit('PositionPpt', {
        position: this.state.positionPpt
  });
}

backtPpt=async()=> {
  const socket = io(this.props.socketUrl, {
    query:
        { pin: this.props.id_access }
  })
  await this.setState({
    positionPpt:this.state.positionPpt - 1
  })
  await this.getUrl()
  await socket.emit('PositionPpt', {
    position: this.state.positionPpt
  });
}
statusFormatter=()=>{

}
  render() {
    return (
      this.state.iframeon ?
        <>
         <div style={styles}> 
        <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="100%" height="100%" style={{ width: "100% !important", height: "100%", pointerEvents: "none" }} allowFullScreen={true}
            mozallowfullscreen="true" webkitallowfullscreen="true" src="" >
          </iframe>
           <ul className="btnNextPrev">
            <li class="prev"  onClick={this.backtPpt}><span></span></li>
            <li class="next " onClick={this.nextPpt}><span></span></li>
          </ul>
          </div>
        </>
          :
      <div style={styles}> 
        <Carousel statusFormatter={this.statusFormatter} showArrows={true} useKeyboardArrows={true} swipeable={true}	 emulateTouch={true}	 showIndicators={false} showThumbs={false} >
            {
                this.state.Slides.map((slide)=>(
                    <div key={slide.index}>
                    <img
                      src={slide.url}
                      alt="Hong Kong"
                    />
                  </div>          
                ))
            }
        </Carousel>
      </div>
    );
  }
}

export default App;
