import React from 'react';
 import Trivia from '../../components/teacher/trivia/Trivia'
 const Triviacontainer =(props)=> {
  
      
         return(
             <div>
                <Trivia socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
             </div>
         )
 }
 export default Triviacontainer;