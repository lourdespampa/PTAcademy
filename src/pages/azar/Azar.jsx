import React from 'react';
import Roulette from './Roulette';

import axios from 'axios'

const handleOnComplete = (value) => {
    console.log(value);
  };

  const url = "http://3.16.110.136:4200"
  
function genCharArray(charA, charZ) {
var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
}
return a;
}


class Azar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alumnos: []
        }
    }

    componentWillMount(){
        axios.get(`${url}/v1/api/lesson/PRJHS/students/roulette`).then( (res) => {
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
                    <Roulette options={this.state.alumnos} baseSize={150} onComplete={handleOnComplete}/>
                </div>
            )
        } else {
            return <p className="text-center">Cargando ruleta...</p>
          }
    }
}

export default Azar;