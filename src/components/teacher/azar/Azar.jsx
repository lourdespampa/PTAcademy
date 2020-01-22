import React from 'react';
import Roulette from './Roulette';
import io from 'socket.io-client';
import axios from 'axios';


const handleOnComplete = (alumno) => {
    console.log(alumno);
  };
class Azar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            alumnos: [],
            showModal: false
        }
    }

    componentWillMount(){
        this.getStudents();
        const socket = io(this.props.socketUrl, {
            query:
                { pin: this.props.id_access }
          })
          socket.on('newAlum',(data)=>{
            if(data.pin == (this.props.id_access).toUpperCase()) {
                this.getStudents()
            }
          })
    }

    getStudents = () => {
        var varToken = localStorage.getItem('token');
        axios({
            url: `${this.props.apiUrl}/v1/api/lesson/${this.props.id_access}/students/roulette`,
            method: 'GET',
            headers: {
                'x-access-token': `${varToken}`
            }
        })
        .then( (res) => {
            const temp = [];
            res.data.map( alumno => {
                temp.push(alumno.name_stu)
            })
            this.setState({ alumnos: this.sortearElementos(temp) })
        })
    }
    sortearElementos = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    mostrarModal = () => {
        // this.setState({showModal: true})
        console.log("hola lourdes")
    }


    render(){
        if(this.state.alumnos.length > 0){
            return(
                <div>
                    <Roulette 
                        options={this.state.alumnos} 
                        baseSize={220} onComplete={handleOnComplete} 
                        socketUrl={this.props.socketUrl} 
                        id_access={this.props.id_access}
                        mostrarModal={this.mostrarModal}
                    />
                </div>
            )
        } else {
            return <p className="text-center">Esperando alumnos para ruleta...</p>
          }
    }
}

export default Azar;