import React,{Component} from 'react'
import Left from '../../containers/teacher/Left'
import Header from '../../containers/student/Header'
import Footer from '../../containers/student/Footer';
export default class Container extends Component {
    
    render() {
        const {children}=this.props
        return (
            <div>
                <Header socket={this.props.socket}/>
                <Left view={'/student/:cod/pizarra'} socket={this.props.socket}/>
                {children }
                <Footer socket={this.props.socket}/>
            </div>
        )
    }
}