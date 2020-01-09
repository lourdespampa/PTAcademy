import React from 'react';
import Empatia from '../../components/teacher/header/Empatia';
import HeaderCode from '../../components/teacher/header/HeaderCode';
import axios from 'axios';

class Header extends React.Component{

    state = {
        nombre_clase:[]
    }
    componentDidMount(){
        this.getNameClass()
    }
    getNameClass = async () => {
        console.log('hola que hace')
        const res = await axios.get(
          "http://3.16.110.136:4200/v1/api/teacher/5dee7931d541305009b31c9f/course_detail"
          // `http://3.16.110.136:4200/v1/api/teacher/${this.props.idteacher}/course_detail`
        );
        this.setState({
            nombre_clase: await res.data.course_name
        });
        console.log('nombre curso'+res.data.course_name)
      };

    render(){
        return(
            <>
                <HeaderCode id_access={this.props.id_access} nombre_clase={this.state.nombre_clase} />
                <Empatia id_access={this.props.id_access} id_class={this.props.id_class}/>
            </>
        )
    }
}

export default Header;