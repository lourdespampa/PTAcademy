import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
            diapositivaHover: false,
            Slides : [],
            iframeon:false,
            src:""
        }
    }

     componentDidMount(){
      console.log('api url: '+this.props.apiUrl)
      console.log('cod class : '+this.props.id_class)
        axios({
            url : `${this.props.apiUrl}/v1/api/teacher/presentations/${this.props.id_class}`,
            method : 'GET',
            headers:{                
      "x-access-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTVmZmQxOTQ0YmZjNThkYjkyYWQ1NCIsImlhdCI6MTU3OTYxNzkxNywiZXhwIjoxNTgwMjIyNzE3fQ.L-L4sX5cTgtDFMTxF_rob7OK2ygYriRqbS9sogl0epU"
    
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
    toggleHoverSlide = () => {
      this.setState({diapositivaHover: !this.state.diapositivaHover})
  }
    getUrl=()=> {
      var old = this.state.src;
      var casi = old.replace("pub", "embed");
      var enlace = casi.replace("delayms=3000", "delayms=3000&rm=minimal&slide=id.p1");
      console.log('get URL: ' + enlace)
      document.getElementById("diapo-frame").src = enlace;
      // document.getElementById("diminute").src = enlace;
  }
  

nextPpt=()=> {
      var cambiado = '';
      var url_string = document.getElementById("diapo-frame").src;
      var url = new URL(url_string);
      var c = url.searchParams.get("slide");
      //Consigue num de la pagina
      var pag = parseInt(c.substr(4)); 
      //Pasas a la siguiente diapo
      var slide = pag + 1;
      //Se quita la pagina antigua
      cambiado = (url.search).substr(0, 58);
      //Se agrega la nueva pagina
      cambiado += slide;
      var final = url.origin + url.pathname + cambiado;
      document.getElementById("diapo-frame").src = final;
      // document.getElementById("diminute").src = final;
  }

backtPpt=()=> {
      var cambiado = '';
      var url_string = document.getElementById("diapo-frame").src;
      var url = new URL(url_string);
      var c = url.searchParams.get("slide");
      //Consigue num de la pagina
      var pag = c.substr(4);
      //Pasas a la siguiente diapo
      var slide = parseInt(pag) - 1;
      //Se quita la pagina antigua
      cambiado = (url.search).substr(0, 58);
      //Se agrega la nueva pagina
      cambiado += slide;
      var final = url.origin + url.pathname + cambiado;
      document.getElementById("diapo-frame").src = final;
      // document.getElementById("diminute").src = final;
  }

  render() {
    return (
      this.state.iframeon ?
        <>
         <div style={styles}> 
        <iframe title="diapo-iframe" id="diapo-frame" frameBorder="0" width="100%" height="100%" style={{ width: "100% !important", height: "100%" }} allowFullScreen={true}
            mozallowfullscreen="true" webkitallowfullscreen="true" src="" >
          </iframe>
           <ul className="btnNextPrev">
            <li class="prev"  onClick={()=>this.backtPpt()}><span></span></li>
            <li class="next " onClick={()=>this.nextPpt()}><span></span></li>
          </ul>
          </div>
        </>
          :
      <div style={styles}> 
        <Carousel showArrows={true} useKeyboardArrows={true} swipeable={true}	 emulateTouch={true}	 showIndicators={false} showThumbs={false} >
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
