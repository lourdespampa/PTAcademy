import React,{Component} from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/student/Header'
import Footer from '../../containers/student/Footer';
export default class Container extends Component {
    
    render() {
        const {children}=this.props
        return (
            <div>
                <Header apiUrl={this.props.apiUrl} socket={this.props.socket} id_access={this.props.id_access} 
                id_student={this.props.id_student} name={this.props.name} lastName={this.props.lastName}/>
                <Left view={`/student/${this.props.id_student}/${this.props.id_access}/pizarra`} socketUrl={this.props.socket} id_access={this.props.id_access}/>
                {children }
                <Footer socket={this.props.socket} id_access={this.props.id_access}/>
            </div>
        )
    }
}