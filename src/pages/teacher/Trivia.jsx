import React from 'react';
 import Trivia from '../../components/teacher/trivia/Trivia'
 const Triviacontainer =(props)=> {
  
      
         return(
             <div>
                <Trivia socketUrl={props.socketUrl} id_access={props.id_access}/>
             </div>
         )
 }
 export default Triviacontainer;