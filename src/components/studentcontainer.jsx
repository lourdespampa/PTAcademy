import React,{Component} from 'react'
import Left from '../containers/teacher/Left'
import Header from '../containers/student/Header'
import Footer from '../containers/student/Footer';
//socket initial
import io from 'socket.io-client';
const socketUrl="http://localhost:4000";
//
export default class Container extends Component {
    constructor(props){
        super(props);
        this.state={
            socket:null,
            user:null
        };
    }
    componentWillMount(){
        this.initSocket()
    }
    initSocket=()=>{
        const socket=io(socketUrl)
        socket.on('connect',()=>{
            console.log("Student Connected")
        })
        this.setState({socket})
    }
    render() {
        const {children}=this.props
        return (
            <div>
                <Header/>
                <Left view={'/student/:cod/pizarra'}/>
                {children}
                <Footer/>
            </div>
        )
    }
}