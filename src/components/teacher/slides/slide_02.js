import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
let styles = {
  margin: "auto",
  width: "500px"
};

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            Slides : []
        }
    }

    componentDidMount(){
        axios({
            
            url : 'http://192.168.1.29:4200/v1/api/teacher/presentations/5e2a0332f956e51094a23624',
            
            //CUANDO SE IMPLEMENTE  url : "localhost:4200/v1/api/teacher/presentations/"+this.props.id_present+"'",
            method : 'GET',
            headers:{                
      "x-access-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTVmZmQxOTQ0YmZjNThkYjkyYWQ1NCIsImlhdCI6MTU3OTYxNzkxNywiZXhwIjoxNTgwMjIyNzE3fQ.L-L4sX5cTgtDFMTxF_rob7OK2ygYriRqbS9sogl0epU"
    
            }
        }).then((response) => {
            console.log(response.data);
            this.setState({Slides:response.data})
            
          }).catch((err)=>{
              console.log(err)
          })
    }

  render() {
    return (
      <div style={styles}>
        <Carousel showIndicators={false} showThumbs={true} >
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
