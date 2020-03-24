import React from 'react';

import RightContainer from '../../components/student/chat/chat_stud'

class Right extends React.Component{

    render(){
        return(
        
            <RightContainer socketUrl={this.props.socketUrl} id_access={this.props.id_access} id_student={this.props.id_student} 
            name={this.props.name} lastName={this.props.lastName} apiUrl={this.props.apiUrl}/>
    
        )
    }
}

export default Right
