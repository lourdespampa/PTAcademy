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
            
            url : 'http://192.168.1.51:4200/v1/api/teacher/presentations/1SaqPXgSyAEPcqxdM7VE7HLWTlzIQWA-QLeEZjNSao2s',
            
            //CUANDO SE IMPLEMENTE  url : "localhost:4200/v1/api/teacher/presentations/"+this.props.id_present+"'",
            method : 'GET',
            headers:{                
      "x-access-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjA3ZTgzMDAwMzQwMTA2NzdmNjBjNiIsImlhdCI6MTU3OTE4Nzg0MywiZXhwIjoxNTc5NzkyNjQzfQ.kZ_mnr5rK5VKzCTdXZDZOq7xGgf_GNcnHhZTYrFv5bs"
    
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
