import React from 'react';
import Roulette from './Roulette';

import axios from 'axios'

const handleOnComplete = (value) => {
    console.log(value);
  };
class Azar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alumnos: []
        }
    }

    componentWillMount(){
        var varToken = localStorage.getItem('token');
    axios({
      url: `${this.props.apiUrl}/v1/api/lesson/${this.props.id_access}/students/roulette`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    })
        .then( (res) => {
            res.data.map( alumno => {
                this.state.alumnos.push(alumno.name_stu)
            })
            const temp = this.state.alumnos
            this.setState({
                alumnos: temp
            })
            console.log(this.state.alumnos)
        })
    }


    render(){
        if(this.state.alumnos.length > 0){
            return(
                <div>
                    <Roulette options={this.state.alumnos} baseSize={220} onComplete={handleOnComplete} socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
                </div>
            )
        } else {
            return <p className="text-center">Cargando ruleta...</p>
          }
    }
}

export default Azar;