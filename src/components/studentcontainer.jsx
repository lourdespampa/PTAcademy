import React,{Component} from 'react'
import Left from '../containers/teacher/Left'
import Header from '../containers/student/Header'
import Footer from '../containers/student/Footer';

export default class Container extends Component {
    render() {
        const {children}=this.props
        return (
            <div>
                <Header/>
                <Left/>
                {children}
                <Footer/>
            </div>
        )
    }
}