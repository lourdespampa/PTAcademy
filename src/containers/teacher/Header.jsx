import React from 'react';
import Empatia from '../../components/teacher/header/Empatia';
import HeaderCode from '../../components/teacher/header/HeaderCode';
import axios from 'axios';

class Header extends React.Component{
    constructor(props) {
        super(props);
    this.state = {
        nombre_clase:''
    }}
    componentDidMount(){
        setTimeout(() => {
        this.getName()},1000)
    }
    getName = async () => {
        console.log('hola que hace'+this.props.id_class)
        var varToken = localStorage.getItem('token');
     const res = await axios({
      url: `http://3.16.110.136:4200/v1/api/teacher/detail_class/${this.props.id_class}`,
      method: 'GET',
      headers: {
        'x-access-token': `${varToken}`
      }
    })
    console.log(res.data)
        this.setState({
            nombre_clase :  await res.data.class_name
        });
    }

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