
import React,{Component} from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/student/Header'
import Footer from '../../containers/student/Footer';
export default class Container extends Component {
    componentDidMount(){
        window.addEventListener("beforeunload", (ev) => 
        {  
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        }); 
    }
    componentWillUnmount(){
        localStorage.clear();
    }
    render() {
        const {children}=this.props
        return (
            <div className="main-student-container">
                <Header   apiUrl={this.props.apiUrl} socketUrl={this.props.socketUrl} id_access={this.props.id_access} 
                id_student={this.props.id_student} name={this.props.name} lastName={this.props.lastName}/>
                <Left   view={`/student/${this.props.id_student}/${this.props.id_access}/pizarra`} socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
                {children}
                <Footer socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
            </div>
        )
    }
}